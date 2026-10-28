const CONDICIONES_CLIMA = {
  0: { descripcion: "Despejado", icono: "☀️" },
  1: { descripcion: "Mayormente despejado", icono: "🌤️" },
  2: { descripcion: "Parcialmente nublado", icono: "⛅" },
  3: { descripcion: "Nublado", icono: "☁️" },
  45: { descripcion: "Niebla", icono: "🌫️" },
  48: { descripcion: "Niebla con escarcha", icono: "🌫️" },
  51: { descripcion: "Llovizna ligera", icono: "🌦️" },
  53: { descripcion: "Llovizna moderada", icono: "🌦️" },
  55: { descripcion: "Llovizna intensa", icono: "🌧️" },
  56: { descripcion: "Llovizna helada ligera", icono: "🌨️" },
  57: { descripcion: "Llovizna helada intensa", icono: "🌨️" },
  61: { descripcion: "Lluvia ligera", icono: "🌦️" },
  63: { descripcion: "Lluvia moderada", icono: "🌧️" },
  65: { descripcion: "Lluvia intensa", icono: "🌧️" },
  66: { descripcion: "Lluvia helada ligera", icono: "🌨️" },
  67: { descripcion: "Lluvia helada intensa", icono: "🌨️" },
  71: { descripcion: "Nevada ligera", icono: "🌨️" },
  73: { descripcion: "Nevada moderada", icono: "🌨️" },
  75: { descripcion: "Nevada intensa", icono: "❄️" },
  77: { descripcion: "Granos de nieve", icono: "❄️" },
  80: { descripcion: "Chubascos ligeros", icono: "🌦️" },
  81: { descripcion: "Chubascos moderados", icono: "🌧️" },
  82: { descripcion: "Chubascos intensos", icono: "🌧️" },
  85: { descripcion: "Chubascos de nieve ligeros", icono: "🌨️" },
  86: { descripcion: "Chubascos de nieve intensos", icono: "❄️" },
  95: { descripcion: "Tormenta eléctrica", icono: "⛈️" },
  96: { descripcion: "Tormenta con granizo ligero", icono: "⛈️" },
  97: { descripcion: "Tormenta intensa", icono: "⛈️" },
  99: { descripcion: "Tormenta con granizo intenso", icono: "⛈️" },
};

export function obtenerCondicionClima(codigo) {
  return (
    CONDICIONES_CLIMA[codigo] ?? {
      descripcion: "Condición no disponible",
      icono: "🌡️",
    }
  );
}
