import { useCallback, useEffect, useState } from "react";
import { consultarCiudadesClima } from "../services/clima.js";

export function useClimaCiudades() {
  const [ciudades, setCiudades] = useState([]);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarCiudades = useCallback(async (busqueda = "") => {
    setCargando(true);
    setError("");

    try {
      const resultado = await consultarCiudadesClima(busqueda);
      setCiudades(resultado.ciudades);
      setTotal(resultado.total);
    } catch (errorConsulta) {
      setError(errorConsulta.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarCiudades();
  }, [cargarCiudades]);

  return {
    ciudades,
    total,
    cargando,
    error,
    cargarCiudades,
  };
}
