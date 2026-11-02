/* =====================================================================
   Ficha de un producto o servicio: galería + información + formulario.
   La usan /catalogo/:idProducto y /servicios/:idServicio.
   ===================================================================== */

import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCatalogo } from "../../estado/CatalogoContext.jsx";
import { useCarrito } from "../../estado/CarritoContext.jsx";
import ImagenProducto from "../comunes/ImagenProducto.jsx";
import MarcasCorte from "../comunes/MarcasCorte.jsx";
import Icono from "../comunes/Icono.jsx";
import FormularioPedido from "./FormularioPedido.jsx";

export default function FichaPedible({ item, volver, children }) {
  const { obtenerCategoria, obtenerIlustracion } = useCatalogo();
  const { obtenerLinea } = useCarrito();
  const [parametros] = useSearchParams();
  const imagenes = useMemo(
    () => [item.imagenPrincipal, ...item.imagenesAdicionales].filter(Boolean),
    [item]
  );
  const [imagenActiva, setImagenActiva] = useState(0);
  const categorias = item.categorias.map(obtenerCategoria).filter((categoria) => categoria && categoria.visible);
  const ilustracion = obtenerIlustracion(item);

  // ¿Se está editando una línea del carrito? (?editar=idLinea)
  const idEdicion = parametros.get("editar");
  const lineaCandidata = idEdicion ? obtenerLinea(idEdicion) : null;
  const lineaEditando =
    lineaCandidata && lineaCandidata.idItem === item.id && lineaCandidata.tipoItem === item.tipoItem ? lineaCandidata : null;

  const indiceSeguro = imagenActiva < imagenes.length ? imagenActiva : 0;

  return (
    <article className="ficha contenedor">
      <Link to={volver.ruta} className="enlace-volver">
        <Icono nombre="volver" tamano={18} /> {volver.texto}
      </Link>

      <div className="ficha__grilla">
        <div className="ficha__galeria">
          <div className="ficha__imagen-principal">
            <ImagenProducto
              src={imagenes[indiceSeguro]}
              alt={indiceSeguro === 0 ? item.textoAlternativo : `${item.nombre}, imagen ${indiceSeguro + 1}`}
              ilustracion={ilustracion}
              prioridad
            />
            <MarcasCorte className="marcas-corte--fijas" />
          </div>
          {imagenes.length > 1 && (
            <ul className="ficha__miniaturas" aria-label="Más imágenes">
              {imagenes.map((imagen, indice) => (
                <li key={imagen}>
                  <button
                    type="button"
                    className={indice === indiceSeguro ? "activa" : ""}
                    aria-pressed={indice === indiceSeguro}
                    aria-label={`Ver imagen ${indice + 1} de ${imagenes.length}`}
                    onClick={() => setImagenActiva(indice)}
                  >
                    <img src={imagen} alt="" loading="lazy" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="ficha__info">
          {categorias.length > 0 && (
            <ul className="ficha__categorias">
              {categorias.map((categoria) => (
                <li key={categoria.id}>
                  <Link to={`/catalogo?categoria=${categoria.id}`}>{categoria.nombre}</Link>
                </li>
              ))}
            </ul>
          )}
          <h1 className="ficha__titulo">{item.nombre}</h1>
          <p className="ficha__descripcion">{item.descripcionExtendida || item.descripcionCorta}</p>
          {children}
          {lineaEditando && <p className="ficha__editando">Estás editando un producto de tu pedido.</p>}
          <FormularioPedido item={item} lineaEditando={lineaEditando} modoPedido={parametros.get("modo") || ""} />
        </div>
      </div>
    </article>
  );
}
