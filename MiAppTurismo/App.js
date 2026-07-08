import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, SafeAreaView, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

// CONFIGURACIÓN DE CONEXIÓN AL BACKEND
// - Si usas emulador Android (AVD): usa 'http://10.0.2.2:3000/api'
// - Si usas emulador iOS / Web: usa 'http://localhost:3000/api'
// - Si usas celular físico con Expo Go: usa la IP local de tu PC (ej. 'http://192.168.1.50:3000/api')
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';
const DEFAULT_USERNAME = 'LeonardoSolis'; // Usuario por defecto para el avance

export default function App() {
  const [tabActiva, setTabActiva] = useState('bitacora');
  const [xp, setXp] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [usuario, setUsuario] = useState(null);
  const [hitos, setHitos] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  // ESTADOS DEL GPS REAL
  const [ubicacion, setUbicacion] = useState({
    latitude: -12.0843, // Ubicación por defecto: Plaza Bolívar PL
    longitude: -77.0622,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });
  const [errorGps, setErrorGps] = useState(null);
  const [cargandoGps, setCargandoGps] = useState(true);

  // Inicializar Datos desde el Backend
  useEffect(() => {
    (async () => {
      try {
        // 1. Obtener Permisos de Ubicación
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorGps('Permiso de ubicación denegado.');
          setCargandoGps(false);
        } else {
          let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          
          setUbicacion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          });
          setCargandoGps(false);
        }

        // 2. Autenticar / Registrar Usuario en el Backend
        const loginRes = await fetch(`${API_URL}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: DEFAULT_USERNAME })
        });
        
        if (!loginRes.ok) throw new Error('Error al iniciar sesión en el backend.');
        const userData = await loginRes.json();
        setUsuario(userData);
        setXp(userData.xp);
        setNivel(userData.nivel);

        // 3. Cargar Catálogo de Hitos del Backend para este usuario
        const hitosRes = await fetch(`${API_URL}/hitos?usuarioId=${userData.id}`);
        if (!hitosRes.ok) throw new Error('Error al cargar hitos del catálogo.');
        const hitosData = await hitosRes.json();
        setHitos(hitosData);

      } catch (err) {
        console.error(err);
        Alert.alert(
          "⚠️ Error de Conexión",
          `No se pudo conectar con el backend en ${API_URL}. Revisa que el servidor esté corriendo y configurado con tu IP.`,
          [{ text: "Entendido" }]
        );
      } finally {
        setCargandoDatos(false);
      }
    })();
  }, []);

  // Función para recargar catálogo e información de progreso
  const refrescarDatos = async (userId) => {
    try {
      const progRes = await fetch(`${API_URL}/users/${userId}/progreso`);
      if (progRes.ok) {
        const progData = await progRes.json();
        setXp(progData.xp);
        setNivel(progData.nivel);
      }
      
      const hitosRes = await fetch(`${API_URL}/hitos?usuarioId=${userId}`);
      if (hitosRes.ok) {
        const hitosData = await hitosRes.json();
        setHitos(hitosData);
      }
    } catch (error) {
      console.log('Error al refrescar datos:', error);
    }
  };

  // Enviar coordenadas anónimas en segundo plano
  const enviarPingAnalitico = async (lat, lon) => {
    try {
      await fetch(`${API_URL}/analytics/ping`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: lat,
          lon: lon,
          sessionId: `session_${DEFAULT_USERNAME}`
        })
      });
    } catch (e) {
      console.log('Error enviando ping analítico:', e);
    }
  };

  // Simular aproximación por GPS (LBS)
  const simularAproximacionLBS = (id, nombre) => {
    Alert.alert(
      "🛰️ Validación GPS (LBS)",
      `¿Deseas verificar tu ubicación actual por GPS para desbloquear: ${nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Verificar GPS 📍", onPress: () => enviarVerificacionVisita(id, 'GPS') }
      ]
    );
  };

  // Enviar verificación de visita al Backend (GPS o fallback FOTO)
  const enviarVerificacionVisita = async (hitoId, metodo) => {
    if (!usuario) {
      Alert.alert("Error", "Usuario no inicializado.");
      return;
    }

    try {
      setCargandoDatos(true);
      // Obtener ubicación GPS actual en tiempo real para mandar al backend
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Enviar coordenadas también al ping de analítica anónima
      enviarPingAnalitico(location.coords.latitude, location.coords.longitude);

      const response = await fetch(`${API_URL}/visitas/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: usuario.id,
          hitoId: hitoId,
          userLat: location.coords.latitude,
          userLon: location.coords.longitude,
          metodoVerificacion: metodo
        })
      });

      const resData = await response.json();

      if (response.ok) {
        // Visita registrada con éxito
        await refrescarDatos(usuario.id);

        if (resData.subioDeNivel) {
          Alert.alert(
            "🎉 ¡SUBISTE DE NIVEL!",
            `Felicidades. Has desbloqueado el hito '${resData.hito.nombre}' y sumado +${resData.xpGanado} XP. ¡Ahora eres Nivel ${resData.nuevoNivel}! 🏆`
          );
        } else {
          Alert.alert(
            "✨ Hito Conquistado",
            `Sumaste +${resData.xpGanado} XP. Distancia medida: ${resData.distancia}m. ¡La historia completa ya está en tu Bitácora!`
          );
        }
      } else {
        // Error de validación (fuera de rango por ejemplo)
        if (resData.error && resData.error.includes('Fuera de rango')) {
          Alert.alert(
            "🛰️ GPS Fuera de Rango",
            `Estás a ${resData.distancia} metros del hito (el radio máximo es ${resData.radioMaximo}m).\n\n¿Deseas activar la contingencia y verificar mediante una Fotografía? 📸`,
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Validar con Foto 📸", onPress: () => enviarVerificacionVisita(hitoId, 'FOTO') }
            ]
          );
        } else {
          Alert.alert("Aviso", resData.error || "No se pudo desbloquear el hito.");
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error en la conexión con el servidor.");
    } finally {
      setCargandoDatos(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤠 TURISMO AL PASO</Text>
        <Text style={styles.headerSubtitle}>M-Commerce & Geolocalización en Vivo</Text>
      </View>

      {/* INDICADOR DE CARGA GENERAL */}
      {cargandoDatos && (
        <View style={styles.cargandoOverlay}>
          <ActivityIndicator size="large" color="#4A3728" />
          <Text style={{ marginTop: 8, fontSize: 12, color: '#4A3728', fontWeight: 'bold' }}>Sincronizando con el Servidor...</Text>
        </View>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <View style={styles.mainContent}>
        {tabActiva === 'bitacora' && (
          <View style={{ flex: 1 }}>
            
            {/* MAPA INTERACTIVO CON LOS 50 HITOS DESDE EL BACKEND */}
            <View style={styles.mapContainer}>
              {cargandoGps ? (
                <View style={styles.mapCenterLoading}>
                  <ActivityIndicator size="large" color="#4A3728" />
                  <Text style={{ marginTop: 8, fontSize: 12 }}>Cargando Mapa...</Text>
                </View>
              ) : (
                <MapView
                  provider={PROVIDER_DEFAULT}
                  style={styles.mapa}
                  region={ubicacion}
                  showsUserLocation={true} // Punto azul GPS
                  followsUserLocation={false}
                >
                  {/* Pintar marcadores dinámicos cargados de la base de datos */}
                  {hitos.map((hito) => (
                    <Marker
                      key={hito.id}
                      coordinate={{ latitude: hito.lat, longitude: hito.lon }}
                      title={hito.nombre}
                      description={`${hito.tipo} | +${hito.xp} XP`}
                      pinColor={hito.visitado ? 'green' : 'orange'}
                    />
                  ))}
                </MapView>
              )}
            </View>

            {/* LISTA DE HITOS */}
            <ScrollView style={styles.scrollContainer}>
              <Text style={styles.sectionTitle}>📍 Catálogo Patrimonial ({hitos.length} hitos cargados)</Text>
              {hitos.map((hito) => (
                <View key={hito.id} style={[styles.card, hito.visitado ? styles.cardVisitado : styles.cardBloqueado]}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.hitoNombre}>{hito.nombre} <Text style={{fontSize: 10, fontWeight: 'normal', color: '#666'}}>({hito.tipo})</Text></Text>
                    <Text style={styles.badgeXp}>+{hito.xp} XP</Text>
                  </View>
                  <Text style={styles.hitoPista} numberOfLines={2}>
                    {hito.visitado ? hito.descripcionCompleta : `🔑 Pista: ${hito.pista}`}
                  </Text>
                  <View style={styles.statusRow}>
                    <Text style={[styles.statusText, hito.visitado ? styles.textVerde : styles.textNaranja]}>
                      {hito.visitado ? "🟢 Desbloqueado" : "🔴 Bloqueado"}
                    </Text>
                    {!hito.visitado && (
                      <TouchableOpacity style={styles.btnSimular} onPress={() => simularAproximacionLBS(hito.id, hito.nombre)}>
                        <Text style={styles.btnText}>📍 Intentar LBS</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* PESTAÑA PROGRESO */}
        {tabActiva === 'perfil' && (
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.sectionTitle}>🏆 Progreso del Usuario: {DEFAULT_USERNAME}</Text>
            <View style={styles.profileCard}>
              <Text style={styles.profileAvatar}>👨‍🚀</Text>
              <Text style={styles.profileName}>Nivel Activo: {nivel}</Text>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${(xp % 400) / 4}%` }]} />
              </View>
              <Text style={styles.progressText}>{xp} XP Acumulados</Text>
              <Text style={{ fontSize: 11, color: '#666', marginTop: 10 }}>Siguiente nivel en {(nivel * 400) - xp} XP</Text>
            </View>
          </ScrollView>
        )}
      </View>

      {/* BARRA DE NAVEGACIÓN INFERIOR */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabItem, tabActiva === 'bitacora' && styles.tabItemActivo]} onPress={() => setTabActiva('bitacora')}>
          <Text style={styles.tabIcon}>🗺️</Text>
          <Text style={styles.tabLabel}>Mapa y Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, tabActiva === 'perfil' && styles.tabItemActivo]} onPress={() => setTabActiva('perfil')}>
          <Text style={styles.tabIcon}>🏆</Text>
          <Text style={styles.tabLabel}>Progreso</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { backgroundColor: '#4A3728', padding: 15, borderBottomWidth: 2, borderBottomColor: '#D2691E' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  headerSubtitle: { color: '#FFE4B5', fontSize: 10, textAlign: 'center', marginTop: 2 },
  mainContent: { flex: 1 },
  mapContainer: { height: Dimensions.get('window').height * 0.3, width: '100%', backgroundColor: '#E0E0E0', overflow: 'hidden', borderBottomWidth: 1, borderBottomColor: '#CCC' },
  mapa: { flex: 1 },
  mapCenterLoading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContainer: { padding: 15 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#4A3728', marginBottom: 10 },
  card: { padding: 12, borderRadius: 10, marginBottom: 10, backgroundColor: '#FFF', borderLeftWidth: 5 },
  cardVisitado: { borderLeftColor: '#2E8B57' },
  cardBloqueado: { borderLeftColor: '#D2691E' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hitoNombre: { fontSize: 13, fontWeight: 'bold', color: '#333', flex: 1 },
  hitoPista: { fontSize: 11, color: '#555', marginTop: 5, fontStyle: 'italic' },
  badgeXp: { backgroundColor: '#FFE4B5', color: '#4A3728', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, fontSize: 10, fontWeight: 'bold' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  textVerde: { color: '#2E8B57' },
  textNaranja: { color: '#D2691E' },
  btnSimular: { backgroundColor: '#D2691E', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
  btnText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  tabBar: { flexDirection: 'row', height: 50, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  tabItem: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  tabItemActivo: { backgroundColor: '#F0E6D2' },
  tabIcon: { fontSize: 16 },
  tabLabel: { fontSize: 9, color: '#4A3728', marginTop: 1, fontWeight: 'bold' },
  profileCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  profileAvatar: { fontSize: 40 },
  profileName: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  progressBarBackground: { width: '100%', height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginTop: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#2E8B57' },
  progressText: { fontSize: 10, color: '#666', marginTop: 5 },
  cargandoOverlay: { padding: 10, backgroundColor: '#FFE4B5', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#D2691E' }
});