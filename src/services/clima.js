import { supabase } from "../config/supabase.js";

export async function consultarCiudadesClima(busqueda = "") {
  if (!supabase) {
    throw new Error("Falta configurar la conexión con Supabase.");
  }

  let consulta = supabase
    .from("clima_ciudades")
    .select(
      "clave, nombre, pais, temperatura, sensacion_termica, humedad, viento_kmh, codigo_clima, actualizado_en",
      { count: "exact" },
    )
    .order("nombre");

  if (busqueda.trim()) {
    consulta = consulta.ilike("nombre", `%${busqueda.trim()}%`);
  }

  const { data, error, count } = await consulta;

  if (error) {
    throw error;
  }

  return {
    ciudades: data ?? [],
    total: count ?? 0,
  };
}
