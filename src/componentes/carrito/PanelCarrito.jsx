/* Panel lateral para mirar el pedido rápido desde cualquier página. */

import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import textosSitio from "../../contenido/textosSitio.js";
import { useCarrito } from "../../estado/CarritoContext.jsx";
import LineaCarrito from "./LineaCarrito.jsx";
import ResumenTotales from "./ResumenTotales.jsx";
import CarritoVacio from "./CarritoVacio.jsx";
import Icono from "../comunes/Icono.jsx";

const textos = textosSitio.carrito;

export default function PanelCarrito() {
  const { panelAbierto, cerrarPanel, resumen } = useCarrito();
  const panel = useRef(null);
  const botonCerrar = useRef(null);
  const ubicacion = useLocation();

  // Al cambiar de página, el panel se cierra.
  useEffect(() => cerrarPanel(), [ubicacion.pathname, cerrarPanel]);

  useEffect(() => {
    if (!panelAbierto) return undefined;
    const focoAnterior = document.activeElement;
    document.body.classList.add("sin-scroll");
    botonCerrar.current?.focus();

    const alPresionarTecla = (evento) => {
      if (evento.key === "Escape") cerrarPanel();
      // Mantiene el foco del teclado dentro del panel.
      if (evento.key === "Tab" && panel.current) {
        const enfocables = panel.current.querySelectorAll('a[href], button:not([disabled]), input, select, textarea');
        if (enfocables.length === 0) return;
        const primero = enfocables[0];
        const ultimo = enfocables[enfocables.length - 1];
        if (evento.shiftKey && document.activeElement === primero) {
          evento.preventDefault();
          ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault();
          primero.focus();
        }
      }
    };
    window.addEventListener("keydown", alPresionarTecla);
    return () => {
      document.body.classList.remove("sin-scroll");
      window.removeEventListener("keydown", alPresionarTecla);
      if (focoAnterior instanceof HTMLElement) focoAnterior.focus();
    };
  }, [panelAbierto, cerrarPanel]);

  return (
    <div className={`panel-carrito ${panelAbierto ? "panel-carrito--abierto" : ""}`} aria-hidden={!panelAbierto}>
      <div className="panel-carrito__fondo" onClick={cerrarPanel} />
      <aside
        ref={panel}
        className="panel-carrito__caja"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-panel-carrito"
        inert={!panelAbierto}
      >
        <div className="panel-carrito__encabezado">
          <h2 id="titulo-panel-carrito">{textos.tituloPanel}</h2>
          <button ref={botonCerrar} type="button" className="boton-icono" onClick={cerrarPanel}>
            <Icono nombre="cerrar" tamano={22} />
            <span className="solo-lectores">Cerrar</span>
          </button>
        </div>

        {resumen.lineas.length === 0 ? (
          <div className="panel-carrito__vacio">
            <CarritoVacio compacto alNavegar={cerrarPanel} />
          </div>
        ) : (
          <>
            <ul className="panel-carrito__lista">
              {resumen.lineas.map((linea) => (
                <LineaCarrito key={linea.idLinea} linea={linea} variante="panel" alNavegar={cerrarPanel} />
              ))}
            </ul>
            <div className="panel-carrito__pie">
              <ResumenTotales totales={resumen.totales} />
              <div className="panel-carrito__botones">
                <Link to="/finalizar-pedido" className="boton boton--principal" onClick={cerrarPanel}>
                  {textos.botonFinalizar}
                </Link>
                <Link to="/carrito" className="boton boton--secundario" onClick={cerrarPanel}>
                  {textos.botonVerPedido}
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
