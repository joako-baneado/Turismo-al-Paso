// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const hitosData = [
  // === PUEBLO LIBRE (18 hitos) ===
  {
    nombre: "Plaza Bolívar",
    tipo: "Republicano",
    xp: 150,
    lat: -12.0843,
    lon: -77.0622,
    pista: "Histórica plaza donde residieron los libertadores José de San Martín y Simón Bolívar.",
    descripcionCompleta: "La Plaza Bolívar es el corazón histórico de Pueblo Libre. Rodeada de casonas coloniales y republicanas, fue testigo del paso de los libertadores de América. Aquí se encuentra el busto de Simón Bolívar y la pileta de bronce que data del siglo XVII.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Museo Nacional de Arqueología, Antropología e Historia",
    tipo: "Cultural",
    xp: 250,
    lat: -12.0846,
    lon: -77.0620,
    pista: "El museo más antiguo del Perú, ubicado frente a la Plaza Bolívar.",
    descripcionCompleta: "Establecido en 1826 por José de San Martín, alberga una vasta colección de objetos prehispánicos, coloniales y republicanos. Es el lugar de origen de la investigación arqueológica peruana, siendo dirigido en su momento por Julio C. Tello.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Antigua Taberna Queirolo",
    tipo: "Tradicional",
    xp: 200,
    lat: -12.0852,
    lon: -77.0614,
    pista: "Famosa taberna fundada en 1880 conocida por sus piscos y vinos.",
    descripcionCompleta: "Fundada por inmigrantes italianos de la familia Queirolo en 1880. Ha mantenido su ambiente tradicional con estanterías de madera originales, mesas de mármol y botellas históricas, siendo un punto de encuentro clave para la bohemia limeña.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Iglesia Santa María Magdalena",
    tipo: "Colonial",
    xp: 300,
    lat: -12.0839,
    lon: -77.0612,
    pista: "Templo del siglo XVI con un impresionante altar barroco bañado en pan de oro.",
    descripcionCompleta: "Fundada en 1557 por la orden de los franciscanos en terrenos cedidos por el cacique Taulichusco. Es una de las iglesias más antiguas de Lima, famosa por sus retablos barrocos tallados y el techo mudéjar.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Huaca Julio C. Tello",
    tipo: "Prehispánico",
    xp: 350,
    lat: -12.0768,
    lon: -77.0635,
    pista: "Sitio arqueológico Ichma que sirvió como centro administrativo.",
    descripcionCompleta: "También conocida como Huaca Panteón Chino. Es una pirámide trunca construida con tapiales que perteneció a la cultura Ichma (900-1470 d.C.) y posteriormente fue ocupada por los Incas. Fue excavada por el Dr. Julio C. Tello.",
    radioDesbloqueo: 100.0
  },
  {
    nombre: "Palacio de la Magdalena (Casa de los Libertadores)",
    tipo: "Republicano",
    xp: 200,
    lat: -12.0845,
    lon: -77.0628,
    pista: "Residencia campestre colonial que albergó a San Martín y Bolívar.",
    descripcionCompleta: "Construido originalmente para el virrey Joaquín de la Pezuela. Se convirtió en la residencia oficial de José de San Martín y luego de Simón Bolívar durante la gesta de la Independencia del Perú.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Quinta de los Libertadores",
    tipo: "Republicano",
    xp: 180,
    lat: -12.0841,
    lon: -77.0632,
    pista: "Hermosos jardines históricos que formaron parte de la residencia libertadora.",
    descripcionCompleta: "Esta casona y sus huertos contiguos sirvieron como centro de planeamiento estratégico militar para las campañas de Junín y Ayacucho bajo la dirección del libertador Simón Bolívar.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Parque el Carmen",
    tipo: "Tradicional",
    xp: 120,
    lat: -12.0802,
    lon: -77.0651,
    pista: "Parque residencial conocido por su tranquilidad y arquitectura de mediados de siglo XX.",
    descripcionCompleta: "Un espacio verde tradicional que representa la transición urbana de Pueblo Libre desde sus orígenes agrícolas a una zona residencial moderna y pacífica a mediados del siglo pasado.",
    radioDesbloqueo: 70.0
  },
  {
    nombre: "Cúpula de la Iglesia María Auxiliadora",
    tipo: "Colonial",
    xp: 150,
    lat: -12.0811,
    lon: -77.0595,
    pista: "Elemento arquitectónico destacado visible desde varios puntos del distrito.",
    descripcionCompleta: "Estructura religiosa de gran valor artístico e histórico, reflejo de la devoción salesiana y del desarrollo de la arquitectura sacra del distrito.",
    radioDesbloqueo: 90.0
  },
  {
    nombre: "Casa de Manuelita Sáenz",
    tipo: "Republicano",
    xp: 220,
    lat: -12.0844,
    lon: -77.0619,
    pista: "Residencia histórica de la 'Libertadora del Libertador'.",
    descripcionCompleta: "Inmueble donde residió Manuela Sáenz, patriota ecuatoriana y compañera sentimental de Simón Bolívar, clave en las luchas de independencia sudamericana.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Plazuela de la Recoleta",
    tipo: "Colonial",
    xp: 140,
    lat: -12.0825,
    lon: -77.0605,
    pista: "Pequeño espacio público con encanto virreinal y rodeado de antiguos conventos.",
    descripcionCompleta: "Punto de descanso histórico utilizado por los monjes recoletos franciscanos para meditación, manteniendo rasgos de la Lima colonial periférica.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Huaca Omás",
    tipo: "Prehispánico",
    xp: 280,
    lat: -12.0722,
    lon: -77.0681,
    pista: "Montículo arqueológico Ichma semi-preservado en el límite del distrito.",
    descripcionCompleta: "Testigo del avanzado sistema de riego prehispánico del valle del río Rímac, este montículo albergaba viviendas y almacenes de la época preincaica.",
    radioDesbloqueo: 100.0
  },
  {
    nombre: "Boulevard San Martín",
    tipo: "Tradicional",
    xp: 100,
    lat: -12.0848,
    lon: -77.0611,
    pista: "Paseo peatonal gastronómico y cultural en las inmediaciones del centro del distrito.",
    descripcionCompleta: "Zona de esparcimiento peatonal que conecta la zona histórica con comercios emblemáticos, promoviendo el turismo y cultura locales.",
    radioDesbloqueo: 70.0
  },
  {
    nombre: "Cruz del Viajero",
    tipo: "Colonial",
    xp: 130,
    lat: -12.0855,
    lon: -77.0633,
    pista: "Hito religioso colonial colocado en el antiguo camino real al Callao.",
    descripcionCompleta: "Instalada en el siglo XVII para que los viajeros que salían de Lima hacia el puerto del Callao encomendaran su viaje y rogaran por protección contra bandoleros.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Antiguo Molino de Santa Beatriz",
    tipo: "Colonial",
    xp: 190,
    lat: -12.0818,
    lon: -77.0572,
    pista: "Restos de un molino de granos virreinal que utilizaba la fuerza de los canales prehispánicos.",
    descripcionCompleta: "Muestra de la industria agrícola colonial que procesaba el trigo cultivado en las haciendas de Pueblo Libre y Magdalena Nueva.",
    radioDesbloqueo: 90.0
  },
  {
    nombre: "Casona Patria y Libertad",
    tipo: "Republicano",
    xp: 170,
    lat: -12.0832,
    lon: -77.0645,
    pista: "Sede de tertulias políticas y literarias del siglo XIX.",
    descripcionCompleta: "Casona con amplio patio central que albergó debates intelectuales durante la reconstrucción nacional post-guerra con Chile.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Parque 3 de Octubre",
    tipo: "Tradicional",
    xp: 110,
    lat: -12.0785,
    lon: -77.0601,
    pista: "Amplio parque central del distrito rodeado de arquitectura típica moderna.",
    descripcionCompleta: "Centro deportivo y social clave para la comunidad de Pueblo Libre, escenario frecuente de ferias artesanales e históricas.",
    radioDesbloqueo: 70.0
  },
  {
    nombre: "Monumento a San Martín",
    tipo: "Republicano",
    xp: 120,
    lat: -12.0842,
    lon: -77.0625,
    pista: "Estatua conmemorativa del libertador argentino donada a inicios del siglo XX.",
    descripcionCompleta: "Ubicado en el parque contiguo al palacio municipal, rinde homenaje al Generalísimo Don José de San Martín y su proclamación de la independencia.",
    radioDesbloqueo: 80.0
  },

  // === RÍMAC (17 hitos) ===
  {
    nombre: "Alameda de los Descalzos",
    tipo: "Colonial",
    xp: 200,
    lat: -12.0305,
    lon: -77.0267,
    pista: "Paseo peatonal mandado a construir en el siglo XVII con estatuas de mármol italianas.",
    descripcionCompleta: "Construida por el Virrey Marqués de Montesclaros en 1611, es una de las alamedas más célebres de Lima. Fue remodelada en el siglo XIX, incorporando verjas de hierro importadas de Inglaterra y 12 estatuas de mármol de Carrara representando los signos zodiacales y las estaciones.",
    radioDesbloqueo: 100.0
  },
  {
    nombre: "Paseo de Aguas",
    tipo: "Colonial",
    xp: 220,
    lat: -12.0294,
    lon: -77.0252,
    pista: "Monumento virreinal con arquerías barrocas inspirado en las villas de Francia.",
    descripcionCompleta: "Construido por el virrey Manuel de Amat y Junyent entre 1770 y 1776, supuestamente para impresionar a la Perricholi. Destaca por sus hermosos arcos barrocos que conducían agua desde el río Rímac.",
    radioDesbloqueo: 90.0
  },
  {
    nombre: "Convento de los Descalzos",
    tipo: "Colonial",
    xp: 250,
    lat: -12.0315,
    lon: -77.0270,
    pista: "Convento franciscano al final de la alameda que guarda una gran pinacoteca colonial.",
    descripcionCompleta: "Fundado a fines del siglo XVI como un lugar de retiro espiritual. Conserva su mística original con patios antiguos, celdas de meditación y una de las colecciones de arte pictórico cusqueño y limeño más valiosas del país.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Quinta de Presa",
    tipo: "Colonial",
    xp: 240,
    lat: -12.0278,
    lon: -77.0345,
    pista: "Mansión de campo de estilo rococó francés del siglo XVIII única en Lima.",
    descripcionCompleta: "Villa campestre construida por la aristocrática familia Carrillo de Albornoz y Bravo de Lagunas. Cuenta con hermosos jardines, salones decorados y un molino de agua privado. Es el máximo exponente del estilo rococó civil de Lima.",
    radioDesbloqueo: 90.0
  },
  {
    nombre: "Cerro San Cristóbal",
    tipo: "Prehispánico",
    xp: 300,
    lat: -12.0289,
    lon: -77.0178,
    pista: "Apu tutelar de Lima desde épocas prehispánicas, hoy coronado por una cruz gigante.",
    descripcionCompleta: "Centro ceremonial sagrado de los Ychsma e Incas. En 1536 fue escenario de la batalla por Lima. El conquistador Francisco Pizarro ordenó colocar la primera cruz y hoy ofrece la mejor vista panorámica de la capital.",
    radioDesbloqueo: 120.0
  },
  {
    nombre: "Plaza de Toros de Acho",
    tipo: "Colonial",
    xp: 210,
    lat: -12.0336,
    lon: -77.0219,
    pista: "La plaza de toros más antigua de América y la tercera del mundo.",
    descripcionCompleta: "Inaugurada en 1766 bajo el gobierno del virrey Amat. Declarada monumento histórico, es un referente arquitectónico de la Lima taurina de antaño.",
    radioDesbloqueo: 90.0
  },
  {
    nombre: "Iglesia de San Lázaro",
    tipo: "Colonial",
    xp: 220,
    lat: -12.0351,
    lon: -77.0282,
    pista: "Primer hospital e iglesia para leprosos de Lima en el siglo XVI.",
    descripcionCompleta: "Construida en 1563, atendió a los enfermos marginados por la sociedad colonial. Presenta una fachada barroca reconstruida tras múltiples sismos.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Capilla del Puente (Nuestra Señora del Rosario)",
    tipo: "Colonial",
    xp: 180,
    lat: -12.0401,
    lon: -77.0289,
    pista: "Considerada la capilla más pequeña del mundo, cerca del Puente de Piedra.",
    descripcionCompleta: "Esta pequeña capilla fue construida en el siglo XVII en el ingreso del antiguo puente que cruzaba el río Rímac, sirviendo como parada de oración obligatoria para arrieros y viajeros.",
    radioDesbloqueo: 70.0
  },
  {
    nombre: "Puente de Piedra (Puente Balta/Puente Trujillo)",
    tipo: "Colonial",
    xp: 160,
    lat: -12.0408,
    lon: -77.0294,
    pista: "Puente colonial que resistió todas las crecidas del río Rímac, construido con argamasa de clara de huevo.",
    descripcionCompleta: "Terminado en 1610 bajo el diseño del arquitecto Juan del Corral. Su resistencia legendaria se atribuye a una mezcla especial de cal, piedra y miles de claras de huevo de aves marinas.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Iglesia de Nuestra Señora del Patrocinio",
    tipo: "Colonial",
    xp: 170,
    lat: -12.0322,
    lon: -77.0261,
    pista: "Templo barroco del siglo XVIII ubicado en las cercanías de la Alameda.",
    descripcionCompleta: "Fundada originalmente como un beaterio para mujeres desamparadas, destaca por su retablo mayor dorado y el diseño característico de su fachada virreinal.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Mirador Inka Ripaq",
    tipo: "Prehispánico",
    xp: 260,
    lat: -12.0255,
    lon: -77.0189,
    pista: "Punto elevado prehispánico de observación militar en las faldas de los cerros del Rímac.",
    descripcionCompleta: "Utilizado por destacamentos indígenas para vigilar los accesos al valle del río Rímac desde el norte, conectado visualmente con el Apu San Cristóbal.",
    radioDesbloqueo: 100.0
  },
  {
    nombre: "Quinta de Copacabana",
    tipo: "Colonial",
    xp: 180,
    lat: -12.0285,
    lon: -77.0302,
    pista: "Antigua residencia recreativa colonial con una capilla familiar consagrada.",
    descripcionCompleta: "Una de las pocas quintas rurales que sobreviven de la Lima del siglo XVIII, caracterizada por sus corredores internos y balcones de madera de cajón.",
    radioDesbloqueo: 90.0
  },
  {
    nombre: "Parque Forestal del Rímac",
    tipo: "Tradicional",
    xp: 110,
    lat: -12.0344,
    lon: -77.0315,
    pista: "Zona verde y de recreación a lo largo del margen del río.",
    descripcionCompleta: "Espacio urbano recuperado que conmemora la importancia ecológica e histórica del río Rímac en la fundación de la ciudad.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Casona del Virrey Amat",
    tipo: "Colonial",
    xp: 230,
    lat: -12.0309,
    lon: -77.0248,
    pista: "Casona señorial ligada a las anécdotas del virrey y la Perricholi.",
    descripcionCompleta: "Edificación del siglo XVIII con amplias arquerías y salones de techos altos que representan el estilo de vida opulento de la corte virreinal.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Iglesia de la Cabeza",
    tipo: "Colonial",
    xp: 150,
    lat: -12.0288,
    lon: -77.0279,
    pista: "Iglesia dedicada a San Juan de la Cabeza, patrono de los agricultores.",
    descripcionCompleta: "Construida para la comunidad agrícola indígena que trabajaba en las huertas y alfalfares que cubrían el Rímac colonial.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Jirón Hualgayoc",
    tipo: "Tradicional",
    xp: 100,
    lat: -12.0331,
    lon: -77.0232,
    pista: "Una de las calles más pintorescas del Rímac por su arquitectura criolla de adobe y quincha.",
    descripcionCompleta: "Calle histórica que conserva fachadas virreinales y balcones republicanos, símbolo de la identidad de 'Abajo el Puente'.",
    radioDesbloqueo: 70.0
  },
  {
    nombre: "Iglesia de San Alfonso",
    tipo: "Republicano",
    xp: 140,
    lat: -12.0325,
    lon: -77.0298,
    pista: "Parroquia neogótica construida por la comunidad redentorista a inicios del siglo XX.",
    descripcionCompleta: "Destaca por sus esbeltas agujas góticas y vitrales de colores importados de Europa, rompiendo con el clásico barroco del distrito.",
    radioDesbloqueo: 80.0
  },

  // === SAN JUAN DE LURIGANCHO (15 hitos) ===
  {
    nombre: "Huaca Mangomarca",
    tipo: "Prehispánico",
    xp: 350,
    lat: -12.0192,
    lon: -76.9855,
    pista: "Imponente centro administrativo político de la cultura Ichma.",
    descripcionCompleta: "Construida con grandes tapiales de barro entre los años 900 y 1470 d.C. Fue el principal asentamiento del curacazgo de Lurigancho (afiliado a los Ichma), con pirámides escalonadas, recintos residenciales y un sistema de murallas defensivas.",
    radioDesbloqueo: 120.0
  },
  {
    nombre: "Huaca Campoy",
    tipo: "Prehispánico",
    xp: 320,
    lat: -12.0125,
    lon: -76.9691,
    pista: "Fortaleza de barro Ichma de carácter defensivo y administrativo.",
    descripcionCompleta: "También conocida como Fortaleza de Campoy. Es un sitio arqueológico construido sobre una ladera rocosa. Destaca por sus altos muros de contención y recintos señoriales destinados a la élite local de la cuenca baja del río Rímac.",
    radioDesbloqueo: 120.0
  },
  {
    nombre: "Sitio Arqueológico Canto Chico",
    tipo: "Prehispánico",
    xp: 300,
    lat: -11.9794,
    lon: -76.9936,
    pista: "Aldea arqueológica residencial ocupada por los Incas.",
    descripcionCompleta: "Asentamiento que muestra la vida cotidiana de las poblaciones locales de agricultores y tejedores preincaicos que posteriormente fueron incorporados al Tawantinsuyu.",
    radioDesbloqueo: 100.0
  },
  {
    nombre: "Templo de las Colcas",
    tipo: "Prehispánico",
    xp: 280,
    lat: -12.0012,
    lon: -76.9745,
    pista: "Zona de antiguos almacenes estatales (colcas) en los cerros de Campoy.",
    descripcionCompleta: "Estructuras circulares y cuadrangulares destinadas al secado y almacenamiento de maíz, papa y textiles producidos bajo control estatal.",
    radioDesbloqueo: 110.0
  },
  {
    nombre: "Geoglifo de Canto Grande",
    tipo: "Prehispánico",
    xp: 400,
    lat: -11.9542,
    lon: -76.9912,
    pista: "Antiguos trazos sobre el suelo desértico de las quebradas de Lurigancho.",
    descripcionCompleta: "Líneas y figuras trapezoidales trazadas sobre la arena que servían con fines rituales y astronómicos vinculados al curacazgo local y la llegada del agua.",
    radioDesbloqueo: 150.0
  },
  {
    nombre: "Pueblito de San Juan",
    tipo: "Tradicional",
    xp: 130,
    lat: -12.0089,
    lon: -76.9995,
    pista: "Zona histórica fundacional del distrito moderno de los años 60.",
    descripcionCompleta: "Zona de origen de los primeros pobladores urbanos que migraron a San Juan de Lurigancho, consolidando el distrito más poblado del país.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Petroglifos de Canto Grande",
    tipo: "Prehispánico",
    xp: 380,
    lat: -11.9488,
    lon: -76.9752,
    pista: "Piedras grabadas con figuras humanas y animales en las zonas altas.",
    descripcionCompleta: "Grabados rupestres que datan de miles de años de antigüedad, testimonio de cazadores y pastores trashumantes que bajaban a los valles costeros.",
    radioDesbloqueo: 120.0
  },
  {
    nombre: "Mirador Cerro El Pino (SJL)",
    tipo: "Tradicional",
    xp: 120,
    lat: -12.0152,
    lon: -76.9902,
    pista: "Mirador urbano con vista a los valles arqueológicos del distrito.",
    descripcionCompleta: "Punto de observación que permite contrastar el vertiginoso desarrollo urbano moderno frente a la preservación de las huacas milenarias del distrito.",
    radioDesbloqueo: 90.0
  },
  {
    nombre: "Huaca Sauce",
    tipo: "Prehispánico",
    xp: 250,
    lat: -12.0233,
    lon: -76.9801,
    pista: "Pequeño centro ceremonial Ichma rodeado por la urbanización contemporánea.",
    descripcionCompleta: "Estructura de tapial que funcionaba como hito sagrado del canal de regadío principal del valle de Lurigancho.",
    radioDesbloqueo: 90.0
  },
  {
    nombre: "Cúpula de la Parroquia San Marcos",
    tipo: "Tradicional",
    xp: 100,
    lat: -11.9855,
    lon: -77.0012,
    pista: "Parroquia emblemática de la zona media del distrito.",
    descripcionCompleta: "Punto de referencia social y espiritual fundado en la época de consolidación de las cooperativas de vivienda del distrito.",
    radioDesbloqueo: 70.0
  },
  {
    nombre: "Huaca Tres Marías",
    tipo: "Prehispánico",
    xp: 270,
    lat: -11.9682,
    lon: -76.9988,
    pista: "Sitio arqueológico con plataformas superpuestas semi-excavadas.",
    descripcionCompleta: "Montículo ceremonial prehispánico donde se encontraron entierros Ichma y vasijas de estilo Inca local.",
    radioDesbloqueo: 100.0
  },
  {
    nombre: "Fortaleza de las Lomas",
    tipo: "Prehispánico",
    xp: 330,
    lat: -11.9385,
    lon: -76.9699,
    pista: "Puesto defensivo incaico ubicado en las lomas de Mangomarca durante el invierno.",
    descripcionCompleta: "Estructura de piedra rústica que controlaba el paso de rebaños de camélidos que aprovechaban la vegetación estacional de lomas.",
    radioDesbloqueo: 110.0
  },
  {
    nombre: "Cementerio Colonial de Lurigancho",
    tipo: "Colonial",
    xp: 160,
    lat: -12.0105,
    lon: -76.9922,
    pista: "Restos del antiguo cementerio del pueblo de reducción de indios.",
    descripcionCompleta: "Campo santo establecido por los curas doctrineros españoles tras la agrupación forzosa de los curacazgos indígenas de la cuenca baja del Rímac.",
    radioDesbloqueo: 80.0
  },
  {
    nombre: "Huaca El Pueblito",
    tipo: "Prehispánico",
    xp: 260,
    lat: -12.0078,
    lon: -77.0005,
    pista: "Montículo habitacional precolombino situado cerca a la Plaza Fundadores.",
    descripcionCompleta: "Servía como centro de almacenamiento local y taller textil para la población adscrita al señorío Lurigancho.",
    radioDesbloqueo: 90.0
  },
  {
    nombre: "Canal de Regadío del Inca (SJL)",
    tipo: "Prehispánico",
    xp: 200,
    lat: -11.9925,
    lon: -76.9818,
    pista: "Restos de canales tallados en piedra que canalizaban el agua del río Rímac.",
    descripcionCompleta: "Muestra excepcional de la ingeniería hidráulica de las culturas prehispánicas que permitió convertir el desierto en campos de cultivo fértiles.",
    radioDesbloqueo: 90.0
  }
];

async function main() {
  console.log('Iniciando seed de base de datos...');
  
  // Limpiar hitos existentes
  await prisma.hito.deleteMany();
  console.log('Catálogo de hitos limpio.');

  // Insertar los 50 hitos
  let contador = 0;
  for (const hito of hitosData) {
    await prisma.hito.create({
      data: hito
    });
    contador++;
  }
  
  console.log(`Seed completado de forma exitosa. Se insertaron ${contador} hitos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
