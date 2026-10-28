export function convertirDatosClima(
  ciudad,
  climaActual,
  fechaActualizacion = new Date().toISOString(),
) {
  if (!Number.isFinite(climaActual.temperature_2m)) {
    throw new Error("La respuesta no incluye una temperatura válida.");
  }

  if (!Number.isFinite(climaActual.apparent_temperature)) {
    throw new Error("La respuesta no incluye una sensación térmica válida.");
  }

  const humedad = climaActual.relative_humidity_2m;

  if (!Number.isInteger(humedad) || humedad < 0 || humedad > 100) {
    throw new Error("La respuesta no incluye un porcentaje de humedad válido.");
  }

  const velocidadViento = climaActual.wind_speed_10m;

  if (!Number.isFinite(velocidadViento) || velocidadViento < 0) {
    throw new Error("La respuesta no incluye una velocidad de viento válida.");
  }

  const codigoClima = climaActual.weather_code;

  if (!Number.isInteger(codigoClima)) {
    throw new Error("La respuesta no incluye un código de clima válido.");
  }

  return {
    clave: ciudad.clave,
    nombre: ciudad.nombre,
    pais: "México",
    latitud: ciudad.latitud,
    longitud: ciudad.longitud,
    temperatura: climaActual.temperature_2m,
    sensacion_termica: climaActual.apparent_temperature,
    humedad,
    viento_kmh: velocidadViento,
    codigo_clima: codigoClima,
    actualizado_en: fechaActualizacion,
  };
}
