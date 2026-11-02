import { Link } from "react-router-dom";
import textosSitio from "../contenido/textosSitio.js";
import configuracionSitio from "../contenido/configuracionSitio.js";
import { useMetadatos } from "../logica/useMetadatos.js";
import EnlacesContacto, { obtenerEnlacesContacto } from "../componentes/comunes/EnlacesContacto.jsx";
import Icono from "../componentes/comunes/Icono.jsx";
import { TrazoTitulo } from "../componentes/comunes/Decoraciones.jsx";

const textos = textosSitio.contacto;

export default function Contacto() {
  useMetadatos({ titulo: textos.tituloPagina, descripcion: textos.bajada });
  const { contacto } = configuracionSitio;
  const hayEnlaces = obtenerEnlacesContacto().length > 0;

  return (
    <div className="pagina-contacto">
      <header className="cabecera-pagina contenedor">
        <h1 className="cabecera-pagina__titulo">
          {textos.titulo}
          <TrazoTitulo />
        </h1>
        <p className="cabecera-pagina__bajada">{textos.bajada}</p>
      </header>

      <div className="contenedor contacto__grilla">
        <section className="contacto__canales" aria-label="Canales de contacto">
          {hayEnlaces ? <EnlacesContacto /> : <p className="contacto__sin-datos">{textos.sinDatos}</p>}
          {(contacto.ciudad || contacto.horarioAtencion) && (
            <div className="contacto__datos">
              {contacto.ciudad && (
                <p>
                  <Icono nombre="ubicacion" tamano={20} /> {contacto.ciudad}
                </p>
              )}
              {contacto.horarioAtencion && (
                <p>
                  <Icono nombre="reloj" tamano={20} /> {contacto.horarioAtencion}
                </p>
              )}
            </div>
          )}
        </section>

        <section className="contacto__pedido" aria-labelledby="titulo-como-pedir">
          <h2 id="titulo-como-pedir">{textosSitio.inicio.pasosTitulo}</h2>
          <ol className="pasos pasos--verticales">
            {textosSitio.inicio.pasos.map((paso) => (
              <li key={paso.titulo}>
                <strong>{paso.titulo}</strong>
                <span>{paso.texto}</span>
              </li>
            ))}
          </ol>
          <Link to="/catalogo" className="boton boton--principal">
            {textos.botonCatalogo}
          </Link>
        </section>
      </div>
    </div>
  );
}
