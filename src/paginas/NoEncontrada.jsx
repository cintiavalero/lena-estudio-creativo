import { Link } from "react-router-dom";
import textosSitio from "../contenido/textosSitio.js";
import { useMetadatos } from "../logica/useMetadatos.js";

const textos = textosSitio.noEncontrada;

export default function NoEncontrada({ titulo, enlace }) {
  useMetadatos({ titulo: titulo ? undefined : textos.tituloPagina });
  return (
    <section className="no-encontrada contenedor">
      <p className="no-encontrada__numero" aria-hidden="true">404</p>
      <h1>{titulo || textos.titulo}</h1>
      <p>{textos.texto}</p>
      <Link to={enlace?.ruta || "/"} className="boton boton--principal">
        {enlace?.texto || textos.boton}
      </Link>
    </section>
  );
}
