import { Link, useParams } from "react-router-dom";
import textosSitio from "../contenido/textosSitio.js";
import { useCatalogo } from "../estado/CatalogoContext.jsx";
import { useMetadatos } from "../logica/useMetadatos.js";
import FichaPedible from "../componentes/catalogo/FichaPedible.jsx";
import TarjetaProducto from "../componentes/catalogo/TarjetaProducto.jsx";
import NoEncontrada from "./NoEncontrada.jsx";

export default function DetalleProducto() {
  const { idProducto } = useParams();
  const { obtenerProducto, productosVisibles } = useCatalogo();
  const producto = obtenerProducto(idProducto);
  const visible = producto && producto.visible;

  useMetadatos({
    titulo: visible ? producto.nombre : textosSitio.ficha.noEncontrado,
    descripcion: visible ? producto.descripcionCorta : "",
  });

  if (!visible) {
    return <NoEncontrada titulo={textosSitio.ficha.noEncontrado} enlace={{ ruta: "/catalogo", texto: textosSitio.ficha.volverCatalogo }} />;
  }

  // Productos relacionados: comparten al menos una categoría.
  const relacionados = productosVisibles
    .filter((otro) => otro.id !== producto.id && otro.categorias.some((categoria) => producto.categorias.includes(categoria)))
    .slice(0, 3);

  return (
    <>
      <FichaPedible item={producto} volver={{ ruta: "/catalogo", texto: textosSitio.ficha.volverCatalogo }} />
      {relacionados.length > 0 && (
        <section className="seccion contenedor" aria-labelledby="titulo-relacionados">
          <div className="seccion__encabezado">
            <h2 id="titulo-relacionados" className="seccion__titulo seccion__titulo--chico">
              También te puede interesar
            </h2>
            <Link to="/catalogo" className="enlace-flecha">Ver catálogo</Link>
          </div>
          <div className="grilla-productos grilla-productos--tres">
            {relacionados.map((otro) => (
              <TarjetaProducto key={otro.id} producto={otro} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
