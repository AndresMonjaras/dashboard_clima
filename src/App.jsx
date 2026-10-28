import { useEffect, useState } from "react";
import { AccesoGoogle } from "./components/AccesoGoogle.jsx";
import { PiePagina } from "./components/PiePagina.jsx";
import { supabase, supabaseConfigurado } from "./config/supabase.js";
import DashboardClima from "./pages/DashboardClima.jsx";
import {
  cerrarSesion,
  iniciarSesionConGoogle,
} from "./services/autenticacion.js";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);
  const [cargandoAutenticacion, setCargandoAutenticacion] = useState(false);
  const [errorAutenticacion, setErrorAutenticacion] = useState("");

  useEffect(() => {
    if (!supabase) {
      setCargandoSesion(false);
      return undefined;
    }

    let componenteActivo = true;
    const { data } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      setUsuario(sesion?.user ?? null);
    });

    supabase.auth
      .getSession()
      .then(({ data: resultado, error }) => {
        if (!componenteActivo) {
          return;
        }

        if (error) {
          setErrorAutenticacion(error.message);
        }

        setUsuario(resultado.session?.user ?? null);
      })
      .catch((error) => {
        if (componenteActivo) {
          setErrorAutenticacion(error.message);
        }
      })
      .finally(() => {
        if (componenteActivo) {
          setCargandoSesion(false);
        }
      });

    return () => {
      componenteActivo = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function manejarInicioSesion() {
    setCargandoAutenticacion(true);
    setErrorAutenticacion("");

    try {
      await iniciarSesionConGoogle();
    } catch (error) {
      setErrorAutenticacion(error.message);
    } finally {
      setCargandoAutenticacion(false);
    }
  }

  async function manejarCierreSesion() {
    setErrorAutenticacion("");

    try {
      await cerrarSesion();
    } catch (error) {
      setErrorAutenticacion(error.message);
    }
  }

  if (!supabaseConfigurado) {
    return (
      <div className="app">
        <main className="pantalla-configuracion">
          <section className="tarjeta-inicio">
            <p className="texto-sobrelinea">Clima al Día</p>
            <h1>Conecta tu proyecto Supabase</h1>
            <p>
              Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY a tu archivo
              .env y reinicia Vite.
            </p>
            <p className="texto-ayuda">
              La clave de servicio solo se usa desde el importador de Node.
            </p>
          </section>
        </main>
        <PiePagina />
      </div>
    );
  }

  return (
    <div className="app">
      {cargandoSesion ? (
        <main className="estado-carga" role="status">
          Revisando tu sesión...
        </main>
      ) : usuario ? (
        <DashboardClima
          correo={usuario.email}
          errorSesion={errorAutenticacion}
          onCerrarSesion={manejarCierreSesion}
        />
      ) : (
        <AccesoGoogle
          onIniciarSesion={manejarInicioSesion}
          cargando={cargandoAutenticacion}
          error={errorAutenticacion}
        />
      )}
      <PiePagina />
    </div>
  );
}

export default App;
