/* =====================================================================
   MENSAJE DE WHATSAPP
   ---------------------------------------------------------------------
   ⚙️  ARCHIVO TÉCNICO.
   Arma el texto del pedido a partir del MISMO resumen que ve el cliente
   en pantalla (resumenPedido.js) y genera el enlace de WhatsApp.
   Los textos fijos del mensaje se editan en
   /src/contenido/configuracionPedidos.js
   ===================================================================== */

import configuracionPedidos from "../contenido/configuracionPedidos.js";
import configuracionSitio from "../contenido/configuracionSitio.js";
import { ESTADOS_PRECIO } from "./precios.js";

// WhatsApp no necesita los espacios especiales que usa el formato de moneda.
const textoPlano = (texto) => String(texto).replace(/[  ]/g, " ");
// Evita que un texto escrito por el cliente rompa el formato (negritas, saltos).
const textoCliente = (texto) => textoPlano(texto).replace(/[*_~`]/g, "").replace(/\s*\n\s*/g, " / ").trim();

export function generarMensajePedido(resumen, datosCliente = {}) {
  const renglones = [configuracionPedidos.mensajeInicial, ""];

  resumen.lineasValidas.forEach((linea, posicion) => {
    renglones.push(`*${posicion + 1}. ${textoCliente(linea.nombre)}*`);
    renglones.push(`- Modalidad: ${linea.textoModalidad}`);
    renglones.push(`- Cantidad: ${linea.cantidad}`);
    for (const detalle of linea.detalles) {
      renglones.push(`- ${textoCliente(detalle.etiqueta)}: ${textoCliente(detalle.valor)}`);
    }
    if (linea.observaciones) renglones.push(`- Observaciones: ${textoCliente(linea.observaciones)}`);

    if (linea.estadoPrecio === ESTADOS_PRECIO.definido) {
      renglones.push(`- Precio unitario: ${textoPlano(linea.textoPrecioUnitario)}`);
      renglones.push(`- Subtotal: ${textoPlano(linea.textoPrecio)}`);
    } else if (linea.estadoPrecio === ESTADOS_PRECIO.aCotizar) {
      renglones.push("- Precio: A cotizar");
    } else {
      renglones.push("- Precio: A confirmar");
    }
    renglones.push("");
  });

  const { totales } = resumen;
  renglones.push("*Resumen*");
  if (totales.lineasConPrecio > 0) {
    renglones.push(`- Subtotal de productos con precio: ${textoPlano(totales.textoSubtotalConocido)}`);
  }
  if (totales.cantidadPendientes > 0) {
    renglones.push(`- Productos pendientes de cotización: ${totales.cantidadPendientes}`);
    renglones.push("- Total definitivo: A confirmar");
  } else {
    renglones.push(`- Total: ${textoPlano(totales.textoTotalDefinitivo)}`);
  }
  renglones.push("");

  if (datosCliente.nombre && datosCliente.nombre.trim()) {
    renglones.push(`*Nombre:* ${textoCliente(datosCliente.nombre)}`);
  }
  if (datosCliente.comentarios && datosCliente.comentarios.trim()) {
    renglones.push(`*Comentarios:* ${textoCliente(datosCliente.comentarios)}`);
  }
  if (datosCliente.nombre?.trim() || datosCliente.comentarios?.trim()) renglones.push("");

  if (resumen.pideArchivos && configuracionPedidos.recordatorioArchivos) {
    renglones.push(configuracionPedidos.recordatorioArchivos);
  }
  renglones.push(configuracionPedidos.mensajeFinal);

  return renglones.join("\n");
}

/** Número de WhatsApp configurado, solo con dígitos (o "" si no hay). */
export function obtenerNumeroWhatsapp() {
  const numero = String(configuracionSitio.contacto?.whatsapp || "").replace(/\D/g, "");
  return numero.length >= 8 ? numero : "";
}

/** Enlace que abre WhatsApp con el texto escrito. "" si no hay número. */
export function crearEnlaceWhatsapp(mensaje = "") {
  const numero = obtenerNumeroWhatsapp();
  if (!numero) return "";
  return mensaje ? `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}` : `https://wa.me/${numero}`;
}

/** true si el enlace es tan largo que conviene ofrecer copiar el mensaje. */
export function esEnlaceDemasiadoLargo(enlace) {
  return enlace.length > (configuracionPedidos.largoMaximoEnlace || 3500);
}
