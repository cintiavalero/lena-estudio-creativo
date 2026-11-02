import { Link } from "react-router-dom";
import textosSitio from "../contenido/textosSitio.js";
import { useCarrito } from "../estado/CarritoContext.jsx";
import { useMetadatos } from "../logica/useMetadatos.js";
import LineaCarrito from "../componentes/carrito/LineaCarrito.jsx";
import ResumenTotales from "../componentes/carrito/ResumenTotales.jsx";
import CarritoVacio from "../componentes/carrito/CarritoVacio.jsx";

const textos = textosSitio.carrito;

export default function Carrito() {
  const { resumen, vaciar } = useCarrito();
  useMetadatos({ titulo: textos.tituloPagina });

  if (resumen.lineas.length === 0) {
    return (
      <section className="contenedor pagina-carrito pagina-carrito--vacia">
        <h1 className="solo-lectores">{textos.titulo}</h1>
        <CarritoVacio />
      </section>
    );
  }

  return (
    <section className="contenedor pagina-carrito" aria-labelledby="titulo-carrito">
      <div className="pagina-carrito__encabezado">
        <h1 id="titulo-carrito" className="cabecera-pagina__titulo">{textos.titulo}</h1>
        <button type="button" className="boton-texto" onClick={vaciar}>
          {textos.botonVaciar}
        </button>
      </div>

      <div className="pagina-carrito__grilla">
        <ul className="pagina-carrito__lista">
          {resumen.lineas.map((linea) => (
            <LineaCarrito key={linea.idLinea} linea={linea} />
          ))}
        </ul>

        <aside className="caja-resumen" aria-label="Resumen del pedido">
          <ResumenTotales totales={resumen.totales} />
          {resumen.lineasNoDisponibles.length > 0 && (
            <p className="caja-resumen__alerta" role="alert">{textos.noDisponible}</p>
          )}
          <div className="caja-resumen__botones">
            {resumen.sePuedeEnviar ? (
              <Link to="/finalizar-pedido" className="boton boton--principal boton--ancho">
                {textos.botonFinalizar}
              </Link>
            ) : (
              <button type="button" className="boton boton--principal boton--ancho" disabled>
                {textos.botonFinalizar}
              </button>
            )}
            <Link to="/catalogo" className="boton boton--secundario boton--ancho">
              {textos.botonSeguir}
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
