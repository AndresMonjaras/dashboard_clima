import { useState } from "react";
import { Cabecera } from "../components/Cabecera.jsx";
import { TarjetaClima } from "../components/TarjetaClima.jsx";
import { useClimaCiudades } from "../hooks/useClimaCiudades.js";

function DashboardClima({ correo, errorSesion, onCerrarSesion }) {
  const [busqueda, setBusqueda] = useState("");
  const { ciudades, total, cargando, error, cargarCiudades } =
    useClimaCiudades();

  async function manejarBusqueda(texto) {
    setBusqueda(texto);
    await cargarCiudades(texto);
  }

  return (
    <>
      <Cabecera
        alBuscar={manejarBusqueda}
        correo={correo}
        onCerrarSesion={onCerrarSesion}
      />

      <main className="contenido-dashboard">
        {errorSesion ? (
          <p className="estado-error" role="alert">
            {errorSesion}
          </p>
        ) : null}

        <section
          className="resumen-dashboard"
          aria-labelledby="titulo-dashboard"
        >
          <div className="resumen-dashboard__texto">
            <p className="texto-sobrelinea">Panel meteorológico de México</p>
            <h2 id="titulo-dashboard">El clima en un vistazo</h2>
            <p>
              Consulta las condiciones actuales de distintas ciudades y revisa
              cuándo se actualizaron sus datos.
            </p>
          </div>
          <div className="resumen-dashboard__total">
            <strong>{total}</strong>
            <span>{total === 1 ? "ciudad" : "ciudades"}</span>
          </div>
        </section>

        <section className="seccion-ciudades" aria-labelledby="titulo-ciudades">
          <div className="seccion-ciudades__encabezado">
            <div>
              <p className="texto-sobrelinea">Condiciones actuales</p>
              <h2 id="titulo-ciudades">Ciudades</h2>
            </div>
            {busqueda ? (
              <p className="seccion-ciudades__busqueda">
                Búsqueda: <strong>{busqueda}</strong>
              </p>
            ) : null}
          </div>

          {cargando ? (
            <p className="estado-carga" role="status" aria-live="polite">
              Cargando datos del clima...
            </p>
          ) : error ? (
            <div className="estado-error" role="alert">
              <p>No se pudieron cargar las ciudades: {error}</p>
              <button
                className="boton-reintentar"
                type="button"
                onClick={() => cargarCiudades(busqueda)}
              >
                Reintentar
              </button>
            </div>
          ) : ciudades.length === 0 ? (
            <div className="estado-vacio" role="status">
              {busqueda ? (
                <p>No hay ciudades que coincidan con “{busqueda}”.</p>
              ) : (
                <>
                  <p>Aún no hay datos meteorológicos guardados.</p>
                  <p>
                    Ejecuta el importador para cargar las ciudades en Supabase.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="grid-ciudades">
              {ciudades.map((ciudad) => (
                <TarjetaClima key={ciudad.clave} ciudad={ciudad} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default DashboardClima;
