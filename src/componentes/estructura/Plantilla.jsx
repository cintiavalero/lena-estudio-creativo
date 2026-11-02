/* Estructura común a todas las páginas: encabezado, contenido y pie. */

import { useEffect } from "react";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import Encabezado from "./Encabezado.jsx";
import PiePagina from "./PiePagina.jsx";
import PanelCarrito from "../carrito/PanelCarrito.jsx";
import AvisoAgregado from "../carrito/AvisoAgregado.jsx";

function VolverArribaAlNavegar() {
  const { pathname, hash } = useLocation();
  const tipoNavegacion = useNavigationType();
  useEffect(() => {
    // Al volver atrás al inicio, el feed retoma solo donde estaba.
    if (tipoNavegacion === "POP" && pathname === "/") return;
    if (hash) {
      const destino = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (destino) {
        destino.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]); // eslint-disable-line react-hooks/exhaustive-deps
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
