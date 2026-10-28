export function PiePagina() {
  return (
    <footer className="pie-pagina">
      <p>
        Datos meteorológicos:{" "}
        <a href="https://open-meteo.com" target="_blank" rel="noreferrer">
          Open-Meteo
        </a>{" "}
        · Datos bajo{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noreferrer"
        >
          CC BY 4.0
        </a>
      </p>
      <p>Las descripciones de las condiciones se muestran en español.</p>
    </footer>
  );
}
