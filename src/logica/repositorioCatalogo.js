/* =====================================================================
   REPOSITORIO DEL CATÁLOGO (acceso a datos)
   ---------------------------------------------------------------------
   ⚙️  ARCHIVO TÉCNICO.

   Es el ÚNICO lugar del sitio que sabe DE DÓNDE salen los productos,
   categorías, servicios y empresas asociadas. Los componentes visuales
   nunca leen los archivos de /src/contenido directamente: piden los
   datos a este repositorio (a través de CatalogoContext).

   HOY: los datos salen de los archivos locales de /src/contenido.

   MAÑANA (con backend): se reemplaza el cuerpo de cargarCatalogo()
   por llamadas a la API, por ejemplo:

     const respuesta = await fetch(`${URL_API}/productos`);
     const productosApi = await respuesta.json();
     productos: ordenarValidos(productosApi, normalizarProducto)

   y el resto del sitio sigue funcionando sin cambios.
   ===================================================================== */

import productosLocales from "../contenido/productos/todosLosProductos.js";
import categoriasLocales from "../contenido/categorias.js";
import serviciosLocales from "../contenido/servicios.js";
import empresasLocales from "../contenido/empresasAsociadas.js";
import {
  normalizarProducto,
  normalizarCategoria,
  normalizarServicio,
  normalizarEmpresa,
  ordenarValidos,
} from "./normalizarDatos.js";

/** Catálogo armado desde los archivos locales (disponible al instante). */
export function obtenerCatalogoLocal() {
  return {
    productos: ordenarValidos(productosLocales, normalizarProducto),
    categorias: ordenarValidos(categoriasLocales, normalizarCategoria),
    servicios: ordenarValidos(serviciosLocales, normalizarServicio),
    empresas: ordenarValidos(empresasLocales, normalizarEmpresa),
  };
}

/**
 * Carga el catálogo. Es asíncrona a propósito: cuando exista una API
 * solo cambia lo que pasa adentro de esta función.
 */
export async function cargarCatalogo() {
  return obtenerCatalogoLocal();
}
