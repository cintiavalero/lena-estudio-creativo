import { Link } from "react-router-dom";
import { useCatalogo } from "../../estado/CatalogoContext.jsx";
import { obtenerTextoPrecioPublicado } from "../../logica/precios.js";
import ImagenProducto from "../comunes/ImagenProducto.jsx";
import MarcasCorte from "../comunes/MarcasCorte.jsx";

export default function TarjetaProducto({ producto, grande = false, prioridad = false }) {
  const { obtenerCategoria } = useCatalogo();
  const categoriaPrincipal = obtenerCategoria(producto.categorias[0]);
  const textoModalidad =
    producto.permiteCompraEstandar && producto.permitePersonalizacion
      ? "Catálogo y a medida"
      : producto.permiteCompraEstandar
        ? "Del catálogo"
        : "A medida";

  return (
    <article className={`tarjeta-producto ${grande ? "tarjeta-producto--grande" : ""}`}>
      <Link to={producto.ruta} className="tarjeta-producto__enlace">
        <div className="tarjeta-producto__marco">
          <ImagenProducto
            src={producto.imagenPrincipal}
            alt={producto.textoAlternativo}
            ilustracion={categoriaPrincipal?.ilustracion}
            prioridad={prioridad}
          />
          <MarcasCorte />
        </div>
        <div className="tarjeta-producto__texto">
          <h3 className="tarjeta-producto__nombre">{producto.nombre}</h3>
          {producto.descripcionCorta && <p className="tarjeta-producto__descripcion">{producto.descripcionCorta}</p>}
          <p className="tarjeta-producto__pie">
            <span className="tarjeta-producto__precio">{obtenerTextoPrecioPublicado(producto)}</span>
            <span className="tarjeta-producto__modalidades">{textoModalidad}</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
