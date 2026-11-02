import { Link } from "react-router-dom";
import configuracionSitio from "../../contenido/configuracionSitio.js";
import textosSitio from "../../contenido/textosSitio.js";
import { menuPiePagina } from "../../contenido/navegacion.js";
import EnlacesContacto, { obtenerEnlacesContacto } from "../comunes/EnlacesContacto.jsx";
import Icono from "../comunes/Icono.jsx";

export default function PiePagina() {
  const textos = textosSitio.piePagina;
  const { contacto, logo, nombreEmprendimiento } = configuracionSitio;
  const hayContacto = obtenerEnlacesContacto().length > 0 || contacto.ciudad || contacto.horarioAtencion;

  return (
    <footer className="pie">
      {/* Barra de control de color, como la de los pliegos de imprenta */}
      <div className="pie__barra-color" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
      <div className="contenedor pie__grilla">
        <div className="pie__marca">
          <img src={logo.archivo} alt={logo.textoAlternativo} width={logo.ancho} height={logo.alto} loading="lazy" />
          <p>{textos.textoMarca}</p>
        </div>

        <nav aria-label="Pie de página" className="pie__columna">
          <h2 className="pie__titulo">{textos.tituloNavegacion}</h2>
          <ul>
            {menuPiePagina.map((enlace) => (
              <li key={enlace.ruta}>
                <Link to={enlace.ruta}>{enlace.texto}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {hayContacto && (
          <div className="pie__columna">
            <h2 className="pie__titulo">{textos.tituloContacto}</h2>
            {contacto.ciudad && (
              <p className="pie__dato">
                <Icono nombre="ubicacion" tamano={18} /> {contacto.ciudad}
              </p>
            )}
            {contacto.horarioAtencion && (
              <p className="pie__dato">
                <Icono nombre="reloj" tamano={18} /> {contacto.horarioAtencion}
              </p>
            )}
            <EnlacesContacto variante="iconos" />
          </div>
        )}
      </div>
      <div className="contenedor pie__legal">
        <p>
          © {new Date().getFullYear()} {nombreEmprendimiento} {configuracionSitio.eslogan}. {textos.derechos}
        </p>
      </div>
    </footer>
  );
}
