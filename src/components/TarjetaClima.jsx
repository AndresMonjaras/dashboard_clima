import { obtenerCondicionClima } from "../utils/condicionesClima.js";

export function TarjetaClima({ ciudad }) {
  const condicion = obtenerCondicionClima(ciudad.codigo_clima);
  const fechaActualizacion = new Date(ciudad.actualizado_en);
  const fechaValida = Number.isFinite(fechaActualizacion.getTime());
  const diferenciaEnMilisegundos = Date.now() - fechaActualizacion.getTime();
  const reciente =
    fechaValida &&
    diferenciaEnMilisegundos >= 0 &&
    diferenciaEnMilisegundos < 3 * 60 * 60 * 1000;
  const horaActualizacion = fechaValida
    ? new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(fechaActualizacion)
    : "Hora no disponible";

  return (
    <article className="tarjeta-clima">
      <header className="tarjeta-clima__encabezado">
        <div>
          <h3>{ciudad.nombre}</h3>
          <span className="tarjeta-clima__pais">{ciudad.pais}</span>
        </div>
        <span className="tarjeta-clima__icono" aria-hidden="true">
          {condicion.icono}
        </span>
      </header>
      <p className="tarjeta-clima__temperatura">
        {Math.round(ciudad.temperatura)}°
      </p>
      <p className="tarjeta-clima__condicion">{condicion.descripcion}</p>
      <dl className="tarjeta-clima__detalles">
        <div>
          <dt>Sensación</dt>
          <dd>{Math.round(ciudad.sensacion_termica)}°</dd>
        </div>
        <div>
          <dt>Humedad</dt>
          <dd>{ciudad.humedad}%</dd>
        </div>
        <div>
          <dt>Viento</dt>
          <dd>{Math.round(ciudad.viento_kmh)} km/h</dd>
        </div>
      </dl>
      <footer className="tarjeta-clima__pie">
        <span
          className={
            reciente ? "etiqueta etiqueta--reciente" : "etiqueta etiqueta--guardado"
          }
        >
          {reciente ? "Actualizado" : "Dato guardado"}
        </span>
        {fechaValida ? (
          <time dateTime={fechaActualizacion.toISOString()}>
            {horaActualizacion}
          </time>
        ) : (
          <span>{horaActualizacion}</span>
        )}
      </footer>
    </article>
  );
}
