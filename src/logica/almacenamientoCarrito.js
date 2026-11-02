/* =====================================================================
   GUARDADO DEL CARRITO EN EL NAVEGADOR (localStorage)
   ---------------------------------------------------------------------
   ⚙️  ARCHIVO TÉCNICO.
   localStorage es solo un respaldo: guarda las líneas para que el
   pedido no se pierda al recargar o cerrar la pestaña. El estado real
   del carrito vive en CarritoContext. Nunca se guardan precios ni
   datos personales.
   ===================================================================== */

import { validarLineas } from "./carrito.js";

export const CLAVE_CARRITO = "lena-carrito";
const VERSION_FORMATO = 1;

export function leerCarritoGuardado() {
  try {
    const texto = window.localStorage.getItem(CLAVE_CARRITO);
    if (!texto) return [];
    const datos = JSON.parse(texto);
    if (!datos || datos.version !== VERSION_FORMATO) return [];
    return validarLineas(datos.lineas);
  } catch {
    // Navegación privada, almacenamiento bloqueado o datos dañados.
    return [];
  }
}

export function guardarCarrito(lineas) {
  try {
    window.localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify({ version: VERSION_FORMATO, lineas, actualizado: new Date().toISOString() })
    );
  } catch {
    // Si no se puede guardar, el carrito igual funciona mientras la pestaña esté abierta.
  }
}
