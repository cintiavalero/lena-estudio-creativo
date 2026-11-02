import { Link, useParams } from "react-router-dom";
import textosSitio from "../contenido/textosSitio.js";
import configuracionSitio from "../contenido/configuracionSitio.js";
import { useCatalogo } from "../estado/CatalogoContext.jsx";
import { useMetadatos } from "../logica/useMetadatos.js";
import Icono from "../componentes/comunes/Icono.jsx";
import { MarcaRegistro } from "../componentes/comunes/Decoraciones.jsx";
import NoEncontrada from "./NoEncontrada.jsx";

const textos = textosSitio.otrosServicios;

export default function EmpresaAsociada() {
  const { idEmpresa } = useParams();
  const { obtenerEmpresa } = useCatalogo();
  const empresa = obtenerEmpresa(idEmpresa);
  const visible = empresa && empresa.visible;

  useMetadatos({
    titulo: visible ? empresa.nombre : textos.tituloPagina,
    descripcion: visible ? empresa.descripcion : "",
  });

  if (!visible) {
    return <NoEncontrada titulo="Esta empresa no está disponible." enlace={{ ruta: "/otros-servicios", texto: textos.volverListado }} />;
  }

  return (
    <article className={`pagina-empresa contenedor pagina-empresa--${empresa.colorAcento}`}>
      <Link to="/otros-servicios" className="enlace-volver">
        <Icono nombre="volver" tamano={18} /> {textos.volverListado}
      </Link>

      <div className="pagina-empresa__tarjeta">
        <MarcaRegistro className="pagina-empresa__registro" />
        {empresa.logo ? (
          <img className="pagina-empresa__logo" src={empresa.logo} alt={`Logo de ${empresa.nombre}`} />
        ) : (
          <span className="asociada__monograma asociada__monograma--grande" aria-hidden="true">{empresa.nombre.slice(0, 1)}</span>
        )}
        <p className="pagina-empresa__categoria">{empresa.categoria}</p>
        <h1 className="pagina-empresa__nombre">{empresa.nombre}</h1>
        <p className="pagina-empresa__descripcion">{empresa.descripcion}</p>

        {empresa.proximamente && (
          <div className="pagina-empresa__proximamente">
            <span className="etiqueta-proximamente">{textos.textoProximamente}</span>
            <p>{textos.textoDetalleProximamente}</p>
          </div>
        )}

        {(empresa.sitioWeb || empresa.instagram) && (
          <div className="pagina-empresa__enlaces">
            {empresa.sitioWeb && (
              <a href={empresa.sitioWeb} className="boton boton--principal" target="_blank" rel="noopener noreferrer">
                {textos.botonSitio} <Icono nombre="externo" tamano={18} />
              </a>
            )}
            {empresa.instagram && (
              <a href={empresa.instagram} className="boton boton--secundario" target="_blank" rel="noopener noreferrer">
                <Icono nombre="instagram" tamano={18} /> {textos.botonInstagram}
              </a>
            )}
          </div>
        )}

        <p className="pagina-empresa__aclaracion">{textos.aclaracion}</p>
      </div>

      <Link to="/" className="boton boton--oscuro pagina-empresa__volver">
        <Icono nombre="volver" tamano={18} /> {textos.volver}
        <span className="solo-lectores"> ({configuracionSitio.nombreEmprendimiento})</span>
      </Link>
    </article>
  );
}
