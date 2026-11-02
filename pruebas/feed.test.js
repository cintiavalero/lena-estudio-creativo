/* Pruebas del feed "Descubrí" del inicio. Se ejecutan con:  npm test */

import { test } from "node:test";
import assert from "node:assert/strict";
import { armarFeed, repartirEnColumnas } from "../src/logica/feed.js";
import { obtenerCatalogoLocal } from "../src/logica/repositorioCatalogo.js";

const catalogo = obtenerCatalogoLocal();
const productos = catalogo.productos.filter((producto) => producto.visible);
const categorias = catalogo.categorias.filter((categoria) => categoria.visible);
const servicios = catalogo.servicios.filter((servicio) => servicio.visible);
const configuracion = {
  mezclarEnCadaVisita: true,
  priorizarProductosConFoto: true,
  cadaCuantosProductosUnaCategoria: 7,
  cadaCuantosProductosUnServicio: 11,
};
const armar = (semilla) => armarFeed({ productos, categorias, servicios, semilla, configuracion });

test("todos los productos visibles aparecen una sola vez", () => {
  const ids = armar(123).filter((e) => e.tipo === "producto").map((e) => e.producto.id);
  assert.equal(ids.length, productos.length);
  assert.equal(new Set(ids).size, productos.length);
});

test("misma semilla = mismo orden; otra semilla = otro orden", () => {
  const orden = (semilla) => armar(semilla).map((e) => e.clave).join(",");
  assert.equal(orden(42), orden(42));
  assert.notEqual(orden(42), orden(4242));
});

test("los productos con foto salen antes que los que no tienen", () => {
  const productosFeed = armar(7).filter((e) => e.tipo === "producto");
  const primeraSinFoto = productosFeed.findIndex((e) => e.fotos.length === 0);
  const ultimaConFoto = productosFeed.map((e) => e.fotos.length > 0).lastIndexOf(true);
  assert.ok(primeraSinFoto > 5, "arranca con productos con foto");
  assert.ok(ultimaConFoto < productosFeed.length);
});

test("no se repiten portadas mientras haya fotos distintas", () => {
  const portadas = armar(99)
    .filter((e) => e.tipo === "producto" && e.fotos.length)
    .map((e) => e.fotos[0]);
  const primeras = portadas.slice(0, new Set(portadas).size);
  assert.equal(new Set(primeras).size, primeras.length);
});

test("intercala accesos a categorías", () => {
  const feed = armar(5);
  assert.ok(feed.some((e) => e.tipo === "categoria"));
  assert.equal(feed[7].tipo, "categoria", "después de 7 productos aparece una categoría");
});

test("agregar elementos al mosaico no mueve los anteriores", () => {
  const feed = armar(11);
  const columnasCorto = repartirEnColumnas(feed.slice(0, 12), 3);
  const columnasLargo = repartirEnColumnas(feed.slice(0, 24), 3);
  columnasCorto.forEach((columna, i) => {
    assert.deepEqual(
      columna.map((e) => e.clave),
      columnasLargo[i].slice(0, columna.length).map((e) => e.clave)
    );
  });
});

test("después de Mezclar, los productos con fotos adicionales muestran otra portada", () => {
  const feed = armarFeed({ productos, categorias, servicios, semilla: 77, configuracion, portadasAlternativas: true });
  const conVarias = feed.filter((e) => e.tipo === "producto" && e.producto.imagenesAdicionales.length > 0);
  assert.ok(conVarias.length > 0);
  for (const e of conVarias) {
    const adicionalesLibres = e.producto.imagenesAdicionales;
    // Si alguna adicional pudo usarse como portada, la principal no va primero.
    if (adicionalesLibres.includes(e.fotos[0])) assert.notEqual(e.fotos[0], e.producto.imagenPrincipal);
  }
  const alternadas = conVarias.filter((e) => e.fotos[0] !== e.producto.imagenPrincipal);
  assert.ok(alternadas.length >= conVarias.length - 1, "casi todos muestran una foto adicional");
  // La principal sigue estando en la galería.
  for (const e of conVarias) assert.ok(e.fotos.includes(e.producto.imagenPrincipal));
});
