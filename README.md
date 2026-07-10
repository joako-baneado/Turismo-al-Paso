# Turismo al Paso - Backend

**Turismo al Paso** es una plataforma diseñada para fomentar el turismo histórico de nicho en Lima Metropolitana. A través de la combinación de **servicios basados en localización (LBS)** y elementos de **gamificación**, la aplicación transforma la experiencia del turista o ciudadano en una aventura interactiva para redescubrir la riqueza patrimonial de distritos históricos como Pueblo Libre, Rímac y San Juan de Lurigancho.

Este repositorio contiene exclusivamente el **backend (API REST y base de datos)** del proyecto. El frontend móvil se encuentra en su respectivo repositorio independiente.

Este proyecto forma parte de los entregables del curso de Gerencia de Proyectos de la Universidad Peruana de Ciencias Aplicadas (UPC).

---

## Características del Backend

*   **API REST con Express:** Rutas estructuradas para gestionar hitos turísticos, usuarios, visitas y autenticación/gamificación.
*   **Verificación Geográfica (LBS):** Validación automatizada que detecta si el usuario está dentro del radio de desbloqueo (100 metros) del monumento.
*   **Contingencia de Verificación:** Aprobación de visitas mediante fotografías en caso de fallas de precisión del GPS.
*   **Base de Datos Relacional:** Modelos definidos en Prisma para usuarios, hitos históricos y visitas realizadas.

---

## Stack Tecnológico

*   **Runtime:** [Node.js](https://nodejs.org/) (Express.js para la API REST).
*   **ORM:** [Prisma ORM](https://www.prisma.io/).
*   **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) (alojada de forma remota en [Supabase](https://supabase.com/)).

---

## Estructura del Repositorio

```text
Turismo-al-Paso/
├── prisma/                  # Esquema de Prisma, base de datos SQLite y script de semilla (seed)
│   ├── schema.prisma
│   └── seed.js
├── src/                     # Código fuente del backend (rutas, controladores, lógica)
│   ├── controllers/         # Lógica de negocio (monumentos, visitas, usuarios)
│   ├── routes/              # Definición de endpoints de la API
│   ├── app.js               # Configuración centralizada de Express
│   └── index.js             # Punto de entrada del servidor
├── .env.example             # Plantilla de variables de entorno para el backend
├── .env                     # Variables de entorno locales (ignorado por Git)
├── package.json             # Dependencias del proyecto backend
├── postman_collection.json  # Pruebas de integración de la API REST
├── Segundo_Avance_Grupo1_LeonardoSolis.md  # Documento técnico detallado del proyecto
└── README.md                # Este archivo de documentación
```

---

## Instalación y Configuración

### Requisitos Previos

Asegúrate de tener instalado:
*   [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
*   Una instancia de base de datos PostgreSQL (puede ser local o remota a través de [Supabase](https://supabase.com/)).

### Pasos de Configuración

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del repositorio a partir de `.env.example`:
    ```env
    PORT=3000
    DATABASE_URL="postgresql://postgres.[ID_PROYECTO]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
    ```

3.  **Generar el cliente de Prisma:**
    ```bash
    npx prisma generate
    ```

4.  **Sincronizar el esquema con la base de datos:**
    ```bash
    npx prisma db push
    ```

5.  **Poblar la base de datos (Seed):**
    Ejecuta el script para poblar la base de datos con los 50 hitos históricos iniciales:
    ```bash
    npm run db:seed
    ```

6.  **Iniciar el servidor en modo desarrollo:**
    ```bash
    npm run dev
    ```
    *El servidor backend estará disponible en `http://localhost:3000`.*

---

## Despliegue en Producción (ej. Render)

El servidor está listo para desplegarse en plataformas como **Render**:
1.  Crea un nuevo **Web Service** conectado a este repositorio.
2.  Configura las siguientes propiedades:
    *   **Root Directory:** Dejar vacío (raíz `/`) o configurar `./`.
    *   **Build Command:** `npm install && npx prisma generate`
    *   **Start Command:** `npx prisma db push --accept-data-loss && npm run db:seed && npm start`
    *   **Environment Variables:** Agrega la variable `DATABASE_URL` con tu cadena de conexión directa a PostgreSQL (puerto `5432`).

---

## Equipo del Proyecto (Grupo 1)

*   **Leonardo Jose Solis Solis**
*   **Fabian Rojas Cuadros**
*   **Joaquin Basas Requena**
*   **Niurka Huarcaya Quispe**

Docente: **Alvaro Antonio Aures Garcia**  
Curso: **Gerencia de Proyectos – 1ASI0727** (UPC)
