import { useState } from "react";

export function Cabecera({ alBuscar, correo, onCerrarSesion }) {
  const [texto, setTexto] = useState("");

  function manejarEnvio(evento) {
    evento.preventDefault();
    alBuscar(texto.trim());
  }

  return (
    <header className="encabezado">
      <div className="encabezado__marca">
        <h1>Clima al Día</h1>
        {correo ? <span className="encabezado__correo">{correo}</span> : null}
      </div>
      <form className="formulario-busqueda" onSubmit={manejarEnvio}>
        <input
          type="text"
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
          placeholder="Buscar ciudad"
          aria-label="Buscar ciudad"
        />
        <button type="submit" aria-label="Buscar ciudad">
          Buscar
        </button>
      </form>
      <button type="button" className="boton-cerrar" onClick={onCerrarSesion}>
        Cerrar sesión
      </button>
    </header>
  );
}
