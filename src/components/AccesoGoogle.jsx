export function AccesoGoogle({ onIniciarSesion, cargando, error }) {
  return (
    <div className="pantalla-inicio">
      <section className="tarjeta-inicio">
        <h1>Clima al Día</h1>
        <p>Consulta el clima de tus ciudades favoritas.</p>
        <button
          type="button"
          className="boton-google"
          onClick={onIniciarSesion}
          disabled={cargando}
          aria-busy={cargando}
        >
          {cargando ? "Conectando..." : "Continuar con Google"}
        </button>
        {error ? (
          <p className="mensaje-error" role="alert">
            {error}
          </p>
        ) : null}
      </section>
    </div>
  );
}
