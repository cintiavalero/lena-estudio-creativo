import { Link } from "react-router-dom";
import textosSitio from "../contenido/textosSitio.js";
import { useCatalogo } from "../estado/CatalogoContext.jsx";
import { useMetadatos } from "../logica/useMetadatos.js";
import Icono from "../componentes/comunes/Icono.jsx";
import { TrazoTitulo } from "../componentes/comunes/Decoraciones.jsx";

const textos = textosSitio.otrosServicios;

export default function OtrosServicios() {
  const { empresasVisibles } = useCatalogo();
  useMetadatos({ titulo: textos.tituloPagina, descripcion: textos.bajada });

  return (
    <div className="pagina-otros">
      <header className="cabecera-pagina contenedor">
        <h1 className="cabecera-pagina__titulo">
          {textos.titulo}
          <TrazoTitulo />
        </h1>
        <p className="cabecera-pagina__bajada">{textos.bajada}</p>
      </header>

      <ul className="contenedor lista-asociadas">
        {empresasVisibles.map((empresa) => (
          <li key={empresa.id}>
            <Link to={empresa.ruta} className={`asociada asociada--grande asociada--${empresa.colorAcento}`}>
              {empresa.logo ? (
                <img className="asociada__logo" src={empresa.logo} alt="" loading="lazy" />
              ) : (
                <span className="asociada__monograma" aria-hidden="true">{empresa.nombre.slice(0, 1)}</span>
              )}
              <span className="asociada__texto">
                <small>{empresa.categoria}</small>
                <strong>{empresa.nombre}</strong>
                <span className="asociada__descripcion">{empresa.descripcion}</span>
              </span>
              <span className="asociada__pie">
                {empresa.proximamente && <span className="etiqueta-proximamente">{textos.textoProximamente}</span>}
                <span className="enlace-flecha">
                  {textos.botonVer} <Icono nombre="ir" tamano={18} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
