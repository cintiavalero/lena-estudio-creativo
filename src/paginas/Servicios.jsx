import { Link } from "react-router-dom";
import textosSitio from "../contenido/textosSitio.js";
import { useCatalogo } from "../estado/CatalogoContext.jsx";
import { useMetadatos } from "../logica/useMetadatos.js";
import ImagenProducto from "../componentes/comunes/ImagenProducto.jsx";
import Revelar from "../componentes/comunes/Revelar.jsx";
import { TrazoTitulo } from "../componentes/comunes/Decoraciones.jsx";

const textos = textosSitio.servicios;

export default function Servicios() {
  const { serviciosVisibles } = useCatalogo();
  useMetadatos({ titulo: textos.tituloPagina, descripcion: textos.bajada });

  return (
    <div className="pagina-servicios">
      <header className="cabecera-pagina contenedor">
        <h1 className="cabecera-pagina__titulo">
          {textos.titulo}
          <TrazoTitulo />
        </h1>
        <p className="cabecera-pagina__bajada">{textos.bajada}</p>
        {serviciosVisibles.length > 1 && (
          <nav className="indice-rapido" aria-label="Servicios">
            {serviciosVisibles.map((servicio) => (
              <a key={servicio.id} href={`#${servicio.id}`}>{servicio.nombre}</a>
            ))}
          </nav>
        )}
      </header>

      <div className="contenedor lista-servicios">
        {serviciosVisibles.map((servicio, indice) => (
          <Revelar como="section" key={servicio.id} id={servicio.id} className={`servicio ${indice % 2 ? "servicio--invertido" : ""}`} aria-labelledby={`titulo-${servicio.id}`}>
            <div className="servicio__imagen">
              <ImagenProducto src={servicio.imagenPrincipal} alt={servicio.textoAlternativo} ilustracion="estrella" />
            </div>
            <div className="servicio__texto">
              <h2 id={`titulo-${servicio.id}`} className="servicio__titulo">{servicio.nombre}</h2>
              <p className="servicio__descripcion">{servicio.descripcionCorta}</p>
              {servicio.incluye.length > 0 && (
                <>
                  <h3 className="servicio__subtitulo">{textos.textoIncluye}</h3>
                  <ul className="servicio__incluye">
                    {servicio.incluye.map((parte) => (
                      <li key={parte}>{parte}</li>
                    ))}
                  </ul>
                </>
              )}
              {servicio.nota && (
                <p className="servicio__nota">
                  {servicio.enlaceNota ? <Link to={servicio.enlaceNota}>{servicio.nota}</Link> : servicio.nota}
                </p>
              )}
              <div className="servicio__acciones">
                {servicio.permitePersonalizacion && (
                  <Link to={servicio.ruta} className="boton boton--principal">
                    {textos.botonPresupuesto}
                  </Link>
                )}
                {servicio.disponibilidad === "consultar" && <span className="etiqueta-estado">{textos.textoConsultar}</span>}
              </div>
            </div>
          </Revelar>
        ))}
      </div>
    </div>
  );
}
