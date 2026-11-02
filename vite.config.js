/* =====================================================================
   CONFIGURACIÓN DE VITE
   ⚙️  ARCHIVO TÉCNICO. No hace falta modificarlo.

   Además de compilar el sitio, este archivo:
   - Completa el título, la descripción y la imagen para compartir del
     index.html con los datos de src/contenido/configuracionSitio.js.
   - Genera robots.txt y, si hay una urlPublica configurada, sitemap.xml.
   ===================================================================== */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import configuracionSitio from "./src/contenido/configuracionSitio.js";
import productos from "./src/contenido/productos/todosLosProductos.js";
import servicios from "./src/contenido/servicios.js";
import empresasAsociadas from "./src/contenido/empresasAsociadas.js";

const escaparHtml = (texto) =>
  String(texto || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const urlPublica = String(configuracionSitio.urlPublica || "").replace(/\/+$/, "");

function datosDelSitio() {
  const titulo = `${configuracionSitio.nombreEmprendimiento} ${configuracionSitio.eslogan}`.trim();
  return {
    name: "datos-del-sitio",
    transformIndexHtml(html) {
      let metaUrl = "";
      if (urlPublica) {
        metaUrl = [
          `<meta property="og:url" content="${escaparHtml(urlPublica)}/" />`,
          `<meta property="og:image" content="${escaparHtml(urlPublica + configuracionSitio.imagenParaCompartir)}" />`,
          `<link rel="canonical" href="${escaparHtml(urlPublica)}/" />`,
        ].join("\n    ");
      }
      return html
        .replaceAll("%TITULO_SITIO%", escaparHtml(titulo))
        .replaceAll("%NOMBRE_SITIO%", escaparHtml(configuracionSitio.nombreEmprendimiento))
        .replaceAll("%DESCRIPCION_SITIO%", escaparHtml(configuracionSitio.descripcionGeneral))
        .replace("<!--%META_URL%-->", metaUrl);
    },
    generateBundle() {
      const lineasRobots = ["User-agent: *", "Allow: /", "Disallow: /carrito", "Disallow: /finalizar-pedido"];
      if (urlPublica) lineasRobots.push("", `Sitemap: ${urlPublica}/sitemap.xml`);
      this.emitFile({ type: "asset", fileName: "robots.txt", source: lineasRobots.join("\n") + "\n" });

      if (!urlPublica) return; // sin dirección definitiva no se genera el sitemap
      const rutas = [
        "/",
        "/catalogo",
        "/servicios",
        "/otros-servicios",
        "/contacto",
        ...productos.filter((p) => p.mostrarProducto !== false && p.idProducto).map((p) => `/catalogo/${p.idProducto}`),
        ...servicios.filter((s) => s.mostrarServicio !== false && s.idServicio).map((s) => `/servicios/${s.idServicio}`),
        ...empresasAsociadas.filter((e) => e.mostrarEmpresa !== false && e.idEmpresa).map((e) => `/otros-servicios/${e.idEmpresa}`),
      ];
      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...rutas.map((ruta) => `  <url><loc>${escaparHtml(urlPublica + ruta)}</loc></url>`),
        "</urlset>",
      ].join("\n");
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: xml + "\n" });
    },
  };
}

export default defineConfig({
  plugins: [react(), datosDelSitio()],
  server: { open: true },
});
