/* =====================================================================
   PRUEBAS AUTOMÁTICAS DE LA LÓGICA DEL CARRITO
   ⚙️  ARCHIVO TÉCNICO. Se ejecutan con:  npm test
   Verifican precios, carrito, resumen y mensaje de WhatsApp usando
   productos de ejemplo (no los del catálogo real).
   ===================================================================== */

import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizarProducto, normalizarServicio } from "../src/logica/normalizarDatos.js";
import { reducerCarrito, crearLinea, validarLineas } from "../src/logica/carrito.js";
import { construirResumenPedido } from "../src/logica/resumenPedido.js";
import { generarMensajePedido } from "../src/logica/mensajeWhatsapp.js";
import { formatearPrecio, obtenerTextoPrecioPublicado } from "../src/logica/precios.js";

const base = {
  descripcionCorta: "", categorias: ["merch-regalos"], etiquetas: [], imagenPrincipal: "", imagenesAdicionales: [],
  formularioPersonalizacion: "textil", aceptaArchivosReferencia: true, cantidadMinima: 1, cantidadMaxima: 50,
  productoDestacado: false, mostrarProducto: true, orden: 1,
};
const tote = normalizarProducto({ ...base, idProducto: "tote", nombre: "Tote Bag", precio: 8500, tipoPrecio: "fijo", permiteCompraEstandar: true, permitePersonalizacion: true, variantes: null });
const remera = normalizarProducto({ ...base, idProducto: "remera", nombre: "Remera", precio: null, tipoPrecio: "consultar", permiteCompraEstandar: false, permitePersonalizacion: true });
const desde = normalizarProducto({ ...base, idProducto: "caja", nombre: "Caja", precio: 3000, tipoPrecio: "desde", permiteCompraEstandar: true, permitePersonalizacion: false });
const oculto = normalizarProducto({ ...base, idProducto: "oculto", nombre: "Oculto", precio: 100, tipoPrecio: "fijo", permiteCompraEstandar: true, mostrarProducto: false });
const logo = normalizarServicio({ idServicio: "logo", nombre: "Diseño de logo", descripcion: "", formularioPersonalizacion: "diseno" });
const items = { tote, remera, caja: desde, oculto, logo };
const buscar = (tipo, id) => (tipo === "servicio" ? (id === "logo" ? logo : null) : items[id] || null);

const agregar = (estado, datos) => reducerCarrito(estado, { tipo: "agregar", linea: crearLinea(datos), cantidadMaxima: 50 });
const vacio = { lineas: [] };

test("formatea pesos argentinos y nunca muestra $0", () => {
  assert.match(formatearPrecio(17000), /^\$\s?17\.000$/);
  assert.equal(formatearPrecio(0), "");
  assert.equal(formatearPrecio(null), "");
  assert.equal(obtenerTextoPrecioPublicado(remera), "Consultar precio");
  assert.match(obtenerTextoPrecioPublicado(desde), /^Desde \$/);
});

test("producto estándar con precio y varias unidades", () => {
  let estado = agregar(vacio, { tipoItem: "producto", idItem: "tote", modalidad: "estandar", cantidad: 1 });
  estado = agregar(estado, { tipoItem: "producto", idItem: "tote", modalidad: "estandar", cantidad: 1 });
  assert.equal(estado.lineas.length, 1, "la misma elección suma unidades en una sola línea");
  const resumen = construirResumenPedido(estado.lineas, buscar);
  assert.equal(resumen.lineas[0].cantidad, 2);
  assert.equal(resumen.totales.subtotalConocido, 17000);
  assert.equal(resumen.totales.estadoTotal, "definido");
  assert.equal(resumen.totales.totalDefinitivo, 17000);
});

test("personalizado nunca suma $0 aunque el estándar tenga precio", () => {
  const estado = agregar(vacio, { tipoItem: "producto", idItem: "tote", modalidad: "personalizado", cantidad: 3, personalizacion: { descripcion: "Mi logo" } });
  const resumen = construirResumenPedido(estado.lineas, buscar);
  assert.equal(resumen.lineas[0].estadoPrecio, "aCotizar");
  assert.equal(resumen.lineas[0].subtotal, null);
  assert.equal(resumen.totales.subtotalConocido, 0);
  assert.equal(resumen.totales.totalDefinitivo, null);
  assert.equal(resumen.totales.estadoTotal, "aConfirmar");
});

test("mismo producto con dos personalizaciones = dos líneas", () => {
  let estado = agregar(vacio, { tipoItem: "producto", idItem: "remera", modalidad: "personalizado", cantidad: 2, personalizacion: { descripcion: "A", talle: "M" } });
  estado = agregar(estado, { tipoItem: "producto", idItem: "remera", modalidad: "personalizado", cantidad: 1, personalizacion: { descripcion: "B", talle: "L" } });
  assert.equal(estado.lineas.length, 2);
});

test("pedido mixto: subtotal conocido + pendientes, sin total definitivo", () => {
  let estado = agregar(vacio, { tipoItem: "producto", idItem: "tote", modalidad: "estandar", cantidad: 2 });
  estado = agregar(estado, { tipoItem: "producto", idItem: "remera", modalidad: "personalizado", cantidad: 3, personalizacion: { descripcion: "Logo al frente", talle: "M", colorBase: "Negro" } });
  estado = agregar(estado, { tipoItem: "producto", idItem: "caja", modalidad: "estandar", cantidad: 1 });
  estado = agregar(estado, { tipoItem: "servicio", idItem: "logo", modalidad: "personalizado", cantidad: 1, personalizacion: { descripcion: "Logo para pastelería" } });
  const resumen = construirResumenPedido(estado.lineas, buscar);
  assert.equal(resumen.totales.subtotalConocido, 17000);
  assert.equal(resumen.totales.cantidadPendientes, 3);
  assert.equal(resumen.lineas[2].estadoPrecio, "aConfirmar", "precio 'desde' queda a confirmar");

  const mensaje = generarMensajePedido(resumen, { nombre: "Cintia", comentarios: "Para el viernes" });
  assert.match(mensaje, /\*1\. Tote Bag\*/);
  assert.match(mensaje, /- Subtotal: \$ ?17\.000/);
  assert.match(mensaje, /- Talle: M/);
  assert.match(mensaje, /- Color de la prenda o tela: Negro/);
  assert.match(mensaje, /- Precio: A cotizar/);
  assert.match(mensaje, /- Precio: A confirmar/);
  assert.match(mensaje, /Productos pendientes de cotización: 3/);
  assert.match(mensaje, /Total definitivo: A confirmar/);
  assert.match(mensaje, /\*Nombre:\* Cintia/);
  assert.doesNotMatch(mensaje, /\$ ?0\b/);
  assert.doesNotMatch(mensaje, /undefined|null|NaN/);
});

test("cambiar cantidad, editar y quitar", () => {
  let estado = agregar(vacio, { tipoItem: "producto", idItem: "remera", modalidad: "personalizado", cantidad: 1, personalizacion: { descripcion: "A" } });
  const id = estado.lineas[0].idLinea;
  estado = reducerCarrito(estado, { tipo: "cambiarCantidad", idLinea: id, cantidad: 999, cantidadMaxima: 50 });
  assert.equal(estado.lineas[0].cantidad, 50, "respeta la cantidad máxima");
  estado = reducerCarrito(estado, { tipo: "actualizar", idLinea: id, cambios: { personalizacion: { descripcion: "B" }, cantidad: 4 } });
  assert.equal(estado.lineas[0].personalizacion.descripcion, "B");
  assert.equal(estado.lineas[0].cantidad, 4);
  estado = reducerCarrito(estado, { tipo: "quitar", idLinea: id });
  assert.equal(estado.lineas.length, 0);
});

test("líneas dañadas o de productos ocultos se detectan", () => {
  const validas = validarLineas([
    { idLinea: "a", tipoItem: "producto", idItem: "tote", modalidad: "estandar", cantidad: 2, personalizacion: {}, observaciones: "", precio: 1 },
    { idLinea: "b", tipoItem: "producto", idItem: "tote", modalidad: "estandar", cantidad: -1 },
    { basura: true },
    { idLinea: "c", tipoItem: "producto", idItem: "oculto", modalidad: "estandar", cantidad: 1 },
  ]);
  assert.equal(validas.length, 2);
  assert.equal("precio" in validas[0], false, "no guarda precios en el carrito");
  const resumen = construirResumenPedido(validas, buscar);
  assert.equal(resumen.lineasNoDisponibles.length, 1);
  assert.equal(resumen.sePuedeEnviar, false);
  assert.equal(resumen.totales.subtotalConocido, 17000, "lo no disponible no suma");
});
