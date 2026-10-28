import assert from "node:assert/strict";
import test from "node:test";
import { convertirDatosClima } from "./convertirDatosClima.js";

test("convierte la respuesta meteorológica en un registro de ciudad", () => {
  assert.equal(typeof convertirDatosClima, "function");

  const ciudad = {
    clave: "cdmx",
    nombre: "Ciudad de México",
    latitud: 19.4326,
    longitud: -99.1332,
  };

  const climaActual = {
    temperature_2m: 24.5,
    apparent_temperature: 26.1,
    relative_humidity_2m: 48,
    wind_speed_10m: 12.3,
    weather_code: 2,
  };

  const fechaActualizacion = "2026-10-27T18:00:00.000Z";
  const resultado = convertirDatosClima(
    ciudad,
    climaActual,
    fechaActualizacion,
  );

  assert.deepEqual(resultado, {
    clave: "cdmx",
    nombre: "Ciudad de México",
    pais: "México",
    latitud: 19.4326,
    longitud: -99.1332,
    temperatura: 24.5,
    sensacion_termica: 26.1,
    humedad: 48,
    viento_kmh: 12.3,
    codigo_clima: 2,
    actualizado_en: fechaActualizacion,
  });
});

test("rechaza una respuesta sin temperatura válida", () => {
  const ciudad = {
    clave: "cdmx",
    nombre: "Ciudad de México",
    latitud: 19.4326,
    longitud: -99.1332,
  };

  const climaActual = {
    temperature_2m: null,
    apparent_temperature: 26.1,
    relative_humidity_2m: 48,
    wind_speed_10m: 12.3,
    weather_code: 2,
  };

  assert.throws(
    () => convertirDatosClima(ciudad, climaActual),
    /temperatura válida/i,
  );
});

test("rechaza un porcentaje de humedad fuera de rango", () => {
  const ciudad = {
    clave: "cdmx",
    nombre: "Ciudad de México",
    latitud: 19.4326,
    longitud: -99.1332,
  };

  const climaActual = {
    temperature_2m: 24.5,
    apparent_temperature: 26.1,
    relative_humidity_2m: 120,
    wind_speed_10m: 12.3,
    weather_code: 2,
  };

  assert.throws(
    () => convertirDatosClima(ciudad, climaActual),
    /porcentaje de humedad válido/i,
  );
});
