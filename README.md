# 🤠 Turismo al Paso

**Turismo al Paso** es una plataforma móvil diseñada para fomentar el turismo histórico de nicho en Lima Metropolitana. A través de la combinación de **servicios basados en localización (LBS)** y elementos de **gamificación**, la aplicación transforma la experiencia del turista o ciudadano en una aventura interactiva para redescubrir la riqueza patrimonial de distritos históricos como Pueblo Libre, Rímac y San Juan de Lurigancho.

Este proyecto forma parte de los entregables del curso de Gerencia de Proyectos de la Universidad Peruana de Ciencias Aplicadas (UPC).

---

## 🚀 Características Principales

*   **📍 Mapa Patrimonial Interactivo:** Visualización en tiempo real de más de 50 hitos y monumentos históricos en Lima.
*   **🎮 Gamificación (XP y Niveles):** Los usuarios ganan puntos de experiencia (XP) y suben de nivel al visitar lugares históricos.
*   **🛰️ Verificación Geográfica (LBS):** Validación automatizada por GPS que detecta si el usuario está dentro del radio de desbloqueo (100 metros) del monumento.
*   **📸 Contingencia de Verificación:** En caso de fallas de precisión del GPS, el sistema permite la verificación de visitas mediante la toma de fotografías.
*   **🔒 Privacidad de Datos:** Recopilación de datos de movilidad de forma 100% anónima, en estricto cumplimiento con la **Ley Peruana N° 29733** (Ley de Protección de Datos Personales).
*   **📖 Bitácora del Viajero:** Registro histórico digital que desbloquea información detallada del monumento únicamente después de haber validado la visita.

---

## 🛠️ Arquitectura y Stack Tecnológico

El proyecto está dividido en un frontend móvil y un backend de servicios:

### Frontend (Aplicación Móvil)
*   **Framework:** [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) (SDK 54).
*   **Geolocalización:** `expo-location` para obtención de coordenadas en tiempo real.
*   **Mapas:** `react-native-maps` para renderizar el mapa interactivo nativo.

### Backend (API REST y Base de Datos)
*   **Runtime:** [Node.js](https://nodejs.org/) con [Express.js](https://expressjs.com/).
*   **ORM:** [Prisma ORM](https://www.prisma.io/).
*   **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) (Alojada de forma remota en [Supabase](https://supabase.com/)).

---

## 📂 Estructura del Repositorio

```text
Turismo-al-Paso/
├── MiAppTurismo/            # Aplicación móvil construida en React Native / Expo
│   ├── assets/              # Recursos visuales (íconos, imágenes)
│   ├── App.js               # Componente principal y lógica de la UI (lee variables .env)
│   ├── app.json             # Configuración de Expo
│   ├── .env.example         # Plantilla de variables de entorno para la app
│   ├── .env                 # Variables de entorno locales (ignorado por git)
│   └── package.json         # Dependencias del frontend
├── backend/                 # API REST construida con Express y Prisma
│   ├── prisma/              # Esquema de Prisma, base de datos SQLite y script de semilla (seed)
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/                 # Código fuente del backend (rutas, controladores, lógica)
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── index.js
│   ├── .env.example         # Plantilla de variables de entorno para el backend
│   ├── .env                 # Variables de entorno locales
│   └── package.json         # Dependencias del backend
├── Segundo_Avance_Grupo1_LeonardoSolis.md  # Documento técnico detallado del proyecto
└── README.md                # Este archivo de documentación
```

---

## ⚙️ Instalación y Configuración

### Requisitos Previos
Asegúrate de tener instalados los siguientes componentes:
*   [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
*   [Expo Go](https://expo.dev/expo-go) instalado en tu dispositivo móvil si deseas probar en hardware real.

---

### 1. Configuración del Backend

1.  Navega al directorio del backend:
    ```bash
    cd backend
    ```
2.  Instala las dependencias del servidor:
    ```bash
    npm install
    ```
3.  Crea un archivo `.env` en la raíz de la carpeta `backend` (puedes basarte en el archivo `.env.example`):
    ```env
    PORT=3000
    DATABASE_URL="postgresql://postgres.[ID_PROYECTO]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
    ```
4.  Sincroniza el esquema del modelo con tu base de datos remota de Supabase:
    ```bash
    npx prisma db push
    ```
5.  Puebla la base de datos con los 50 hitos históricos iniciales (script seed):
    ```bash
    npm run db:seed
    ```
6.  Inicia el servidor en modo desarrollo local:
    ```bash
    npm run dev
    ```
    *El backend estará disponible localmente en `http://localhost:3000`.*

---

### 2. Configuración del Frontend (MiAppTurismo)

1.  Navega al directorio de la aplicación móvil:
    ```bash
    cd ../MiAppTurismo
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  **Configura la URL de conexión de la API:**
    Crea un archivo `.env` en la raíz de la carpeta `MiAppTurismo` (puedes duplicar el archivo `.env.example`) y define el valor de `EXPO_PUBLIC_API_URL` según tu entorno:
    *   **Para producción (Servidor en Render):**
        ```env
        EXPO_PUBLIC_API_URL=https://turismo-al-paso.onrender.com/api
        ```
    *   **Para desarrollo con emulador Android (AVD):**
        ```env
        EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api
        ```
    *   **Para desarrollo con emulador iOS o navegador web:**
        ```env
        EXPO_PUBLIC_API_URL=http://localhost:3000/api
        ```
    *   **Para desarrollo con celular físico en Expo Go:** Usa la IP local de tu PC en la red Wi-Fi:
        ```env
        EXPO_PUBLIC_API_URL=http://192.168.1.50:3000/api
        ```
4.  Inicia el entorno de Expo:
    ```bash
    npm start
    ```
5.  Escanea el código QR generado desde la consola con la cámara de tu celular (iOS) o desde la aplicación Expo Go (Android) para ejecutar la app.

---

### 🚀 3. Despliegue en la Nube (Producción)

El proyecto está configurado para desplegarse de manera automatizada usando **Supabase** y **Render**:

#### Base de Datos (Supabase)
1. Crea un proyecto en [Supabase](https://supabase.com/).
2. Copia la cadena de conexión URI en **Project Settings** -> **Database** (elige la conexión directa en el puerto `5432`).
3. Reemplaza la contraseña de tu base de datos y configúrala como `DATABASE_URL` en el archivo `.env` o en las variables de Render.

#### Servidor Web (Render)
1. Crea un **Web Service** en [Render](https://render.com/) apuntando al repositorio de GitHub.
2. Configura los siguientes parámetros en el panel:
   * **Root Directory:** `backend`
   * **Build Command:** `npm install && npm run build`
   * **Start Command:** `npx prisma db push --accept-data-loss && npm run db:seed && npm start`
   * **Variables de Entorno:** Añade la variable `DATABASE_URL` con tu cadena de conexión directa de Supabase (puerto `5432`).

---

## 👥 Equipo del Proyecto (Grupo 1)

*   **Leonardo Jose Solis Solis**
*   **Fabian Rojas Cuadros**
*   **Joaquin Basas Requena**
*   **Niurka Huarcaya Quispe**

Docente: **Alvaro Antonio Aures Garcia**  
Curso: **Gerencia de Proyectos – 1ASI0727** (Universidad Peruana de Ciencias Aplicadas - UPC)
