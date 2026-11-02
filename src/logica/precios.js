/* =====================================================================
   PRECIOS
   ---------------------------------------------------------------------
   ⚙️  ARCHIVO TÉCNICO.
   Única lógica de precios del sitio. Tarjetas, ficha, carrito,
   finalización y mensaje de WhatsApp usan SOLO estas funciones, así
   nunca muestran importes distintos.

   Reglas:
   - Un producto personalizado o un servicio SIEMPRE queda "a cotizar",
     aunque el modelo estándar tenga precio.
   - Un modelo estándar suma al subtotal solo si tiene tipoPrecio "fijo"
     y un precio válido. Si es "desde" o no tiene precio, queda
     "a confirmar".
   - Nada sin precio se cuenta como $0.
   ===================================================================== */

import configuracionPedidos from "../contenido/configuracionPedidos.js";

export const ESTADOS_PRECIO = {
  definido: "definido", //       tiene precio y se suma
  aCotizar: "aCotizar", //       personalizado o servicio
  aConfirmar: "aConfirmar", //   modelo estándar sin precio fijo
};

let formateador = null;
function obtenerFormateador() {
  if (!formateador) {
    try {
      formateador = new Intl.NumberFormat(configuracionPedidos.formatoRegional || "es-AR", {
        style: "currency",
        currency: configuracionPedidos.moneda || "ARS",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    } catch {
      formateador = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 2 });
    }
  }
  return formateador;
}

/** 8500 → "$ 8.500". Si el valor no es un precio válido devuelve "". */
export function formatearPrecio(valor) {
  if (typeof valor !== "number" || !Number.isFinite(valor) || valor <= 0) return "";
  return obtenerFormateador().format(valor);
}

/** Texto del precio publicado de un producto (tarjetas y ficha). */
export function obtenerTextoPrecioPublicado(item) {
  if (!item) return configuracionPedidos.textoSinPrecio;
  const precio = formatearPrecio(item.precio);
  if (!precio || !item.permiteCompraEstandar) return configuracionPedidos.textoSinPrecio;
  if (item.tipoPrecio === "fijo") return precio;
  if (item.tipoPrecio === "desde") return `Desde ${precio}`;
  return configuracionPedidos.textoSinPrecio;
}

/** Precio por unidad de una línea, o null si no está definido. */
export function obtenerPrecioUnitario(item, modalidad) {
  if (!item || modalidad !== "estandar") return null;
  if (item.tipoPrecio !== "fijo") return null;
  return typeof item.precio === "number" && item.precio > 0 ? item.precio : null;
}

/** Estado del precio de una línea del carrito. */
export function obtenerEstadoPrecio(item, modalidad) {
  if (modalidad !== "estandar") return ESTADOS_PRECIO.aCotizar;
  return obtenerPrecioUnitario(item, modalidad) === null ? ESTADOS_PRECIO.aConfirmar : ESTADOS_PRECIO.definido;
}

/** Calcula precio unitario, subtotal y estado de una línea. */
export function calcularLinea(item, modalidad, cantidad) {
  const precioUnitario = obtenerPrecioUnitario(item, modalidad);
  return {
    estadoPrecio: obtenerEstadoPrecio(item, modalidad),
    precioUnitario,
    subtotal: precioUnitario === null ? null : redondear(precioUnitario * cantidad),
  };
}

/** Texto para mostrar el precio de una línea (carrito y mensaje). */
export function obtenerTextoPrecioLinea(lineaCalculada) {
  if (lineaCalculada.estadoPrecio === ESTADOS_PRECIO.definido) return formatearPrecio(lineaCalculada.subtotal);
  if (lineaCalculada.estadoPrecio === ESTADOS_PRECIO.aCotizar) return configuracionPedidos.textoACotizar;
  return configuracionPedidos.textoAConfirmar;
}

/**
 * Totales del pedido a partir de líneas ya calculadas.
 * estadoTotal: "vacio" | "definido" | "aConfirmar"
 */
export function calcularTotales(lineasCalculadas) {
  let subtotalConocido = 0;
  let lineasConPrecio = 0;
  let cantidadPendientes = 0;
  let cantidadUnidades = 0;

  for (const linea of lineasCalculadas) {
    cantidadUnidades += linea.cantidad;
    if (linea.estadoPrecio === ESTADOS_PRECIO.definido) {
      subtotalConocido += linea.subtotal;
      lineasConPrecio += 1;
    } else {
      cantidadPendientes += 1;
    }
  }

  const hayImportesSinDefinir = cantidadPendientes > 0;
  const estadoTotal = lineasCalculadas.length === 0 ? "vacio" : hayImportesSinDefinir ? "aConfirmar" : "definido";

  return {
    subtotalConocido: redondear(subtotalConocido),
    lineasConPrecio,
    cantidadPendientes,
    cantidadUnidades,
    hayImportesSinDefinir,
    estadoTotal,
    // El total definitivo solo existe cuando no falta ningún importe.
    totalDefinitivo: estadoTotal === "definido" ? redondear(subtotalConocido) : null,
  };
}

function redondear(valor) {
  return Math.round(valor * 100) / 100;
}
