import { Link, useParams } from "react-router-dom";
import textosSitio from "../contenido/textosSitio.js";
import { useCatalogo } from "../estado/CatalogoContext.jsx";
import { useMetadatos } from "../logica/useMetadatos.js";
import FichaPedible from "../componentes/catalogo/FichaPedible.jsx";
import NoEncontrada from "./NoEncontrada.jsx";

const textos = textosSitio.servicios;

export default function DetalleServicio() {
  const { idServicio } = useParams();
  const { obtenerServicio } = useCatalogo();
  const servicio = obtenerServicio(idServicio);
  const visible = servicio && servicio.visible && servicio.permitePersonalizacion;

  useMetadatos({ titulo: visible ? servicio.nombre : "Servicio no encontrado", descripcion: visible ? servicio.descripcionCorta : "" });

  if (!visible) {
    return <NoEncontrada titulo="Este servicio no está disponible." enlace={{ ruta: "/servicios", texto: textosSitio.ficha.volverServicios }} />;
  }

  return (
    <FichaPedible item={servicio} volver={{ ruta: "/servicios", texto: textosSitio.ficha.volverServicios }}>
      {servicio.disponibilidad === "consultar" && <p className="etiqueta-estado">{textos.textoConsultar}</p>}
      {servicio.incluye.length > 0 && (
        <ul className="ficha__incluye" aria-label={textos.textoIncluye}>
          {servicio.incluye.map((parte) => (
            <li key={parte}>{parte}</li>
          ))}
        </ul>
      )}
      {servicio.nota && (
        <p className="servicio__nota">
          {servicio.enlaceNota ? <Link to={servicio.enlaceNota}>{servicio.nota}</Link> : servicio.nota}
        </p>
      )}
    </FichaPedible>
  );
}
