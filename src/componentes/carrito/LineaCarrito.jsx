/* Una línea del pedido. Todos los datos (nombre, imagen, precio) vienen
   del resumen del pedido, que a su vez los toma del catálogo. */

import { Link } from "react-router-dom";
import textosSitio from "../../contenido/textosSitio.js";
import { ESTADOS_PRECIO } from "../../logica/precios.js";
import { useCarrito } from "../../estado/CarritoContext.jsx";
import { useCatalogo } from "../../estado/CatalogoContext.jsx";
import ImagenProducto from "../comunes/ImagenProducto.jsx";
import SelectorCantidad from "../comunes/SelectorCantidad.jsx";
import Icono from "../comunes/Icono.jsx";

const textos = textosSitio.carrito;

export default function LineaCarrito({ linea, variante = "completa", alNavegar }) {
  const { cambiarCantidad, quitar } = useCarrito();
  const { obtenerIlustracion } = useCatalogo();
  const soloLectura = variante === "revision";
  const compacta = variante === "panel";
  const ilustracion = obtenerIlustracion(linea.item);
  const puedeEditar = linea.disponible && !soloLectura && (linea.modalidad === "personalizado" || linea.item?.variantes);
  const detallesVisibles = compacta ? linea.detalles.slice(0, 2) : linea.detalles;

  return (
    <li className={`linea-carrito linea-carrito--${variante} ${linea.disponible ? "" : "linea-carrito--no-disponible"}`}>
      <Link to={linea.ruta} className="linea-carrito__imagen" tabIndex={-1} aria-hidden="true" onClick={alNavegar}>
        <ImagenProducto src={linea.imagen} alt="" ilustracion={ilustracion} />
      </Link>

      <div className="linea-carrito__cuerpo">
        <div className="linea-carrito__encabezado">
          <h3 className="linea-carrito__nombre">
            {linea.item ? (
              <Link to={linea.ruta} onClick={alNavegar}>{linea.nombre}</Link>
            ) : (
              linea.nombre
            )}
          </h3>
          <span className={`etiqueta-modalidad etiqueta-modalidad--${linea.modalidad}`}>{linea.textoModalidad}</span>
        </div>

        {!linea.disponible && <p className="linea-carrito__alerta" role="alert">{linea.motivoNoDisponible}</p>}

        {(detallesVisibles.length > 0 || (!compacta && linea.observaciones)) && (
          <dl className="linea-carrito__detalles">
            {detallesVisibles.map((detalle) => (
              <div key={detalle.etiqueta}>
                <dt>{detalle.etiqueta}</dt>
                <dd>{detalle.valor}</dd>
              </div>
            ))}
            {!compacta && linea.observaciones && (
              <div>
                <dt>{textosSitio.ficha.textoObservaciones}</dt>
                <dd>{linea.observaciones}</dd>
              </div>
            )}
          </dl>
        )}
        {compacta && linea.detalles.length > 2 && <p className="linea-carrito__mas">+ {linea.detalles.length - 2} detalles</p>}

        <div className="linea-carrito__pie">
          {soloLectura ? (
            <span className="linea-carrito__cantidad">Cantidad: {linea.cantidad}</span>
          ) : (
            linea.item && (
              <SelectorCantidad
                compacto={compacta}
                valor={linea.cantidad}
                minimo={linea.item.cantidadMinima}
                maximo={linea.item.cantidadMaxima}
                etiqueta={`Cantidad de ${linea.nombre}`}
                alCambiar={(cantidad) => cambiarCantidad(linea.idLinea, cantidad)}
              />
            )
          )}
          {linea.disponible && (
            <div className={`linea-carrito__precio linea-carrito__precio--${linea.estadoPrecio}`}>
              {linea.estadoPrecio === ESTADOS_PRECIO.definido && linea.cantidad > 1 && (
                <small>{linea.textoPrecioUnitario} c/u</small>
              )}
              <strong>{linea.textoPrecio}</strong>
            </div>
          )}
        </div>

        {!soloLectura && (
          <div className="linea-carrito__acciones">
            {puedeEditar && (
              <Link to={`${linea.ruta}?editar=${encodeURIComponent(linea.idLinea)}`} className="boton-texto" onClick={alNavegar}>
                <Icono nombre="editar" tamano={16} /> {textos.botonEditar}
              </Link>
            )}
            <button type="button" className="boton-texto" onClick={() => quitar(linea.idLinea)} aria-label={`${textos.botonQuitar} ${linea.nombre}`}>
              <Icono nombre="papelera" tamano={16} /> {textos.botonQuitar}
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
