/* =====================================================================
   TÍTULO Y DESCRIPCIÓN DE CADA PÁGINA (SEO)
   ⚙️  ARCHIVO TÉCNICO.
   ===================================================================== */

import { useEffect } from "react";
import configuracionSitio from "../contenido/configuracionSitio.js";

function definirMeta(selector, atributo, nombre, contenido) {
  let etiqueta = document.head.querySelector(selector);
  if (!etiqueta) {
    etiqueta = document.createElement("meta");
    etiqueta.setAttribute(atributo, nombre);
    document.head.appendChild(etiqueta);
  }
  etiqueta.setAttribute("content", contenido);
}

export function useMetadatos({ titulo = "", descripcion = "" } = {}) {
  useEffect(() => {
    const nombre = configuracionSitio.nombreEmprendimiento;
    const tituloCompleto = titulo ? `${titulo} | ${nombre} ${configuracionSitio.eslogan}`.trim() : `${nombre} ${configuracionSitio.eslogan}`.trim();
    const descripcionFinal = descripcion || configuracionSitio.descripcionGeneral;
    document.title = tituloCompleto;
    definirMeta('meta[name="description"]', "name", "description", descripcionFinal);
    definirMeta('meta[property="og:title"]', "property", "og:title", tituloCompleto);
    definirMeta('meta[property="og:description"]', "property", "og:description", descripcionFinal);
    if (configuracionSitio.urlPublica) {
      definirMeta('meta[property="og:url"]', "property", "og:url", `${configuracionSitio.urlPublica}${window.location.pathname}`);
    }
  }, [titulo, descripcion]);
}
