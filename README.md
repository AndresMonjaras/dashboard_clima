# Clima al Día

Dashboard web para consultar las condiciones meteorológicas actuales de ocho
ciudades de México. La aplicación guarda los datos en Supabase y permite
buscar ciudades después de iniciar sesión con Google.

## Tecnologías

- React y Vite
- JavaScript y CSS
- Supabase PostgreSQL y Supabase Auth
- Open-Meteo para consultar el clima
- Node.js para importar datos

## Funcionalidades

- Inicio y cierre de sesión con Google.
- Búsqueda por nombre de ciudad.
- Temperatura, sensación térmica, humedad, viento y condición del clima.
- Indicador de actualización y hora de consulta.
- Estados de carga, error y búsqueda sin resultados.
- Diseño adaptable a computadora, tableta y móvil.
- Importador independiente del frontend que actualiza los registros existentes.

## Estructura

```text
dashboard_clima/
├── index.html
├── package.json
├── scripts/
│   ├── convertirDatosClima.js
│   ├── convertirDatosClima.test.js
│   └── importarClima.js
├── src/
│   ├── App.jsx
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── styles.css
└── supabase/
    └── esquema.sql
```

## Requisitos

- Node.js 20.6 o posterior.
- Un proyecto de Supabase.
- Un proveedor Google OAuth configurado en Supabase.

## Instalación

Instala las dependencias del proyecto:

```bash
npm install
```

Copia `.env.example` a `.env` y agrega los valores de tu proyecto Supabase.
El navegador solo usa las variables que comienzan con `VITE_`.

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` es privada. El importador la lee desde Node y no
debe agregarse a variables `VITE_` ni al código del navegador.

## Configuración de Supabase

1. Abre el editor SQL de Supabase y ejecuta `supabase/esquema.sql`.
2. En Authentication, habilita Google e ingresa las credenciales OAuth de
   Google.
3. Agrega `http://localhost:5173` a las URL de retorno permitidas en Supabase.
4. En Google Cloud, agrega la URL de callback de Supabase a las URL de retorno
   autorizadas del cliente OAuth.

La tabla solo permite leer datos a usuarios autenticados. El importador usa la
clave de servicio desde Node para guardar las nuevas mediciones.

## Ejecutar la aplicación

Inicia Vite con:

```bash
npm run dev
```

## Importar condiciones meteorológicas

Después de configurar Supabase, actualiza las ciudades con:

```bash
npm run importar:clima
```

El importador consulta Open-Meteo una ciudad a la vez y actualiza sus registros
en Supabase usando la clave de cada ciudad. Se puede ejecutar de nuevo sin
crear filas duplicadas.

El dashboard muestra “Actualizado” cuando la última importación ocurrió hace
menos de tres horas. Después de ese tiempo, marca la medición como “Dato
guardado” y conserva la hora de consulta.

## Pruebas y compilación

Ejecuta las pruebas de conversión de datos con:

```bash
npm test
```

Genera los archivos de producción con:

```bash
npm run build
```

## Fuente de datos y atribución

Los datos meteorológicos provienen de
[Open-Meteo](https://open-meteo.com/en/docs) y se usan bajo la licencia
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). La aplicación
atribuye la fuente en el pie de página; las descripciones de condiciones se
presentan traducidas al español.

El uso gratuito de Open-Meteo está destinado a fines no comerciales. La
documentación y condiciones vigentes están en
[open-meteo.com](https://open-meteo.com/en/terms).
