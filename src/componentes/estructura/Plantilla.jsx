/* Estructura común a todas las páginas: encabezado, contenido y pie. */

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Encabezado from "./Encabezado.jsx";
import PiePagina from "./PiePagina.jsx";
import PanelCarrito from "../carrito/PanelCarrito.jsx";
import AvisoAgregado from "../carrito/AvisoAgregado.jsx";

function VolverArribaAlNavegar() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const destino = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (destino) {
        destino.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Plantilla() {
  return (
    <>
      <a className="saltar-contenido" href="#contenido">
        Saltar al contenido
      </a>
      <VolverArribaAlNavegar />
      <Encabezado />
      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>
      <PiePagina />
      <PanelCarrito />
      <AvisoAgregado />
    </>
  );
}
