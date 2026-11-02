/* =====================================================================
   RESUMEN DEL PEDIDO
   ---------------------------------------------------------------------
   ⚙️  ARCHIVO TÉCNICO.
   Combina las líneas del carrito con el catálogo y calcula todo lo
   que se muestra. El panel del carrito, la página del carrito, la
   pantalla de finalización y el mensaje de WhatsApp usan ESTE mismo
   resumen: por eso siempre coinciden.

   También es el formato base de un futuro "pedido" para enviar a una API
   (ver construirPedidoParaApi al final).
   ===================================================================== */

import textosSitio from "../contenido/textosSitio.js";
import { calcularLinea, calcularTotales, obtenerTextoPrecioLinea, formatearPrecio } from "./precios.js";
import { ajustarCantidad } from "./carrito.js";

const textos = textosSitio.carrito;

/** Motivo por el que una línea no se puede pedir, o "" si está todo bien. */
function obtenerMotivoNoDisponible(linea, item) {
  if (!item || !item.visible) return textos.noDisponible;
  if (linea.modalidad === "estandar" && !item.permiteCompraEstandar) return textos.noDisponible;
  if (linea.modalidad === "personalizado" && !item.permitePersonalizacion) return textos.noDisponible;
  if (linea.modalidad === "estandar" && item.variantes && !item.variantes.opciones.includes(linea.variante)) {
    return `Elegí nuevamente la opción de «${item.variantes.etiqueta}».`;
  }
  return "";
}

function obtenerTextoModalidad(linea) {
  if (linea.tipoItem === "servicio") return textos.modalidadServicio;
  return linea.modalidad === "estandar" ? textos.modalidadEstandar : textos.modalidadPersonalizada;
}

/** Lista de detalles legibles: [{ etiqueta, valor }] en el orden del formulario. */
function obtenerDetalles(linea, item) {
  const detalles = [];
  if (!item) return detalles;
  if (linea.modalidad === "estandar" && item.variantes && linea.variante) {
    detalles.push({ etiqueta: item.variantes.etiqueta, valor: linea.variante });
  }
  if (linea.modalidad === "personalizado") {
    for (const campo of item.camposPersonalizacion) {
      const valor = linea.personalizacion[campo.idCampo];
      if (valor) detalles.push({ etiqueta: campo.etiquetaCorta, valor });
    }
  }
  return detalles;
}

/**
 * @param {Array} lineas        líneas del carrito (estado global)
 * @param {Function} buscarItem (tipoItem, idItem) => item del catálogo | null
 */
export function construirResumenPedido(lineas, buscarItem) {
  const lineasResumen = lineas.map((linea) => {
    const item = buscarItem(linea.tipoItem, linea.idItem);
    const motivoNoDisponible = obtenerMotivoNoDisponible(linea, item);
    const cantidad = item
      ? ajustarCantidad(linea.cantidad, item.cantidadMinima, item.cantidadMaxima)
      : linea.cantidad;
    const calculo = calcularLinea(item, linea.modalidad, cantidad);
    const lineaCalculada = { ...calculo, cantidad };

    return {
      ...linea,
      cantidad,
      item,
      disponible: motivoNoDisponible === "",
      motivoNoDisponible,
      nombre: item ? item.nombre : textos.noDisponible,
      imagen: item ? item.imagenPrincipal : "",
      textoAlternativo: item ? item.textoAlternativo : "",
      ruta: item ? item.ruta : "/catalogo",
      textoModalidad: obtenerTextoModalidad(linea),
      detalles: obtenerDetalles(linea, item),
      ...calculo,
      textoPrecioUnitario: formatearPrecio(calculo.precioUnitario),
      textoPrecio: obtenerTextoPrecioLinea(lineaCalculada),
      pideArchivos: Boolean(item && item.aceptaArchivosReferencia && linea.modalidad === "personalizado"),
    };
  });

  const lineasValidas = lineasResumen.filter((linea) => linea.disponible);
  const totales = calcularTotales(lineasValidas);

  return {
    lineas: lineasResumen,
    lineasValidas,
    lineasNoDisponibles: lineasResumen.filter((linea) => !linea.disponible),
    totales: {
      ...totales,
      textoSubtotalConocido: formatearPrecio(totales.subtotalConocido),
      textoTotalDefinitivo: formatearPrecio(totales.totalDefinitivo),
    },
    pideArchivos: lineasValidas.some((linea) => linea.pideArchivos),
    // El pedido se puede enviar si hay al menos una línea válida y ninguna dañada.
    sePuedeEnviar: lineasValidas.length > 0 && lineasResumen.length === lineasValidas.length,
  };
}

/**
 * PREPARADO PARA EL FUTURO: datos que se enviarían a una API de pedidos.
 * Solo referencias y elecciones; el servidor recalcula los precios.
 * (Hoy no se usa: el pedido se envía por WhatsApp.)
 */
export function construirPedidoParaApi(resumen, datosCliente) {
  return {
    lineas: resumen.lineasValidas.map(({ tipoItem, idItem, modalidad, cantidad, variante, personalizacion, observaciones }) => ({
      tipoItem, idItem, modalidad, cantidad, variante, personalizacion, observaciones,
    })),
    cliente: { nombre: datosCliente.nombre || "" },
    comentarios: datosCliente.comentarios || "",
  };
}
