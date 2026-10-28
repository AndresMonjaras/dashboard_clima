import { createClient } from "@supabase/supabase-js";
import { convertirDatosClima } from "./convertirDatosClima.js";

const API_CLIMA_URL = "https://api.open-meteo.com/v1/forecast";

const CIUDADES = [
  {
    clave: "cdmx",
    nombre: "Ciudad de México",
    latitud: 19.4326,
    longitud: -99.1332,
  },
  {
    clave: "guadalajara",
    nombre: "Guadalajara",
    latitud: 20.6597,
    longitud: -103.3496,
  },
  {
    clave: "monterrey",
    nombre: "Monterrey",
    latitud: 25.6866,
    longitud: -100.3161,
  },
  {
    clave: "puebla",
    nombre: "Puebla",
    latitud: 19.0414,
    longitud: -98.2063,
  },
  {
    clave: "merida",
    nombre: "Mérida",
    latitud: 20.9674,
    longitud: -89.5926,
  },
  {
    clave: "tijuana",
    nombre: "Tijuana",
    latitud: 32.5149,
    longitud: -117.0382,
  },
  {
    clave: "oaxaca",
    nombre: "Oaxaca de Juárez",
    latitud: 17.0732,
    longitud: -96.7266,
  },
  {
    clave: "cancun",
    nombre: "Cancún",
    latitud: 21.1619,
    longitud: -86.8515,
  },
];

function crearParametros(ciudad) {
  return new URLSearchParams({
    latitude: String(ciudad.latitud),
    longitude: String(ciudad.longitud),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto",
  });
}

async function consultarClimaCiudad(ciudad) {
  const parametros = crearParametros(ciudad);
  const respuesta = await fetch(`${API_CLIMA_URL}?${parametros}`, {
    signal: AbortSignal.timeout(15000),
  });

  if (!respuesta.ok) {
    throw new Error(`Open-Meteo respondió con HTTP ${respuesta.status}.`);
  }

  const datos = await respuesta.json();

  if (!datos.current) {
    throw new Error("Open-Meteo no devolvió las condiciones actuales.");
  }

  return datos.current;
}

async function importarClima() {
  const direccionSupabase = process.env.SUPABASE_URL;
  const claveServicio = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!direccionSupabase || !claveServicio) {
    throw new Error(
      "Configura SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en el archivo .env.",
    );
  }

  const supabase = createClient(direccionSupabase, claveServicio, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const registros = [];
  const errores = [];

  for (const ciudad of CIUDADES) {
    try {
      const climaActual = await consultarClimaCiudad(ciudad);
      const registro = convertirDatosClima(ciudad, climaActual);

      registros.push(registro);
      console.log(`Clima consultado: ${ciudad.nombre}`);
    } catch (error) {
      errores.push(ciudad.nombre);
      console.error(`No se pudo consultar ${ciudad.nombre}: ${error.message}`);
    }
  }

  if (registros.length > 0) {
    const { error } = await supabase
      .from("clima_ciudades")
      .upsert(registros, { onConflict: "clave" });

    if (error) {
      throw error;
    }

    console.log(`Ciudades guardadas en Supabase: ${registros.length}`);
  }

  if (errores.length > 0) {
    process.exitCode = 1;
    console.error(`Ciudades con errores: ${errores.join(", ")}`);
    return;
  }

  console.log("La actualización del clima terminó correctamente.");
}

importarClima().catch((error) => {
  console.error(`No se pudo actualizar el clima: ${error.message}`);
  process.exitCode = 1;
});
