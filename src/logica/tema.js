/* =====================================================================
   APLICAR COLORES Y TIPOGRAFÍAS
   ⚙️  ARCHIVO TÉCNICO.
   Lee coloresTema.js y los vuelca como variables CSS (--color-…),
   así los estilos nunca repiten un color escrito a mano.
   ===================================================================== */

import { coloresTema, tipografias } from "../contenido/coloresTema.js";

const aGuiones = (nombre) => nombre.replace(/[A-Z]/g, (letra) => `-${letra.toLowerCase()}`);
const esColorValido = (valor) => typeof valor === "string" && /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(valor.trim());

export function aplicarTema() {
  const raiz = document.documentElement;
  for (const [nombre, valor] of Object.entries(coloresTema)) {
    if (esColorValido(valor)) raiz.style.setProperty(`--color-${aGuiones(nombre)}`, valor.trim());
  }
  if (tipografias.titulos) raiz.style.setProperty("--fuente-titulos", tipografias.titulos);
  if (tipografias.textos) raiz.style.setProperty("--fuente-textos", tipografias.textos);

  if (tipografias.direccionGoogleFonts && !document.getElementById("fuentes-sitio")) {
    const enlace = document.createElement("link");
    enlace.id = "fuentes-sitio";
    enlace.rel = "stylesheet";
    enlace.href = tipografias.direccionGoogleFonts;
    document.head.appendChild(enlace);
  }

  const metaColor = document.querySelector('meta[name="theme-color"]');
  if (metaColor && esColorValido(coloresTema.fondo)) metaColor.setAttribute("content", coloresTema.fondo);
}
