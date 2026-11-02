/* =====================================================================
   NORMALIZACIÓN DE DATOS
   ---------------------------------------------------------------------
   ⚙️  ARCHIVO TÉCNICO. No hace falta modificarlo para editar contenido.

   Toma los datos escritos a mano en /src/contenido y les completa los
   valores que falten, para que el sitio nunca muestre "undefined",
   "$0" o una imagen rota aunque un dato quede incompleto.

   Cuando el catálogo venga de una API, estas mismas funciones
   transforman la respuesta del servidor al formato que usa el sitio.
   ===================================================================== */

import { formulariosPersonalizacion } from "../contenido/personalizaciones.js";

const TIPOS_PRECIO = ["fijo", "desde", "consultar"];
const TIPOS_CAMPO = ["texto", "textoLargo", "seleccion", "fecha"];

const esTextoConContenido = (valor) => typeof valor === "string" && valor.trim() !== "";
const comoTexto = (valor, respaldo = "") => (esTextoConContenido(valor) ? valor.trim() : respaldo);
const comoLista = (valor) => (Array.isArray(valor) ? valor : []);
const comoListaDeTextos = (valor) => comoLista(valor).filter(esTextoConContenido).map((texto) => texto.trim());

function comoEnteroPositivo(valor, respaldo) {
  const numero = Number(valor);
  return Number.isInteger(numero) && numero > 0 ? numero : respaldo;
}

/** Devuelve el precio como número válido (> 0) o null. */
export function normalizarPrecio(valor) {
  const numero = typeof valor === "string" ? Number(valor.replace(/\./g, "").replace(",", ".")) : valor;
  return typeof numero === "number" && Number.isFinite(numero) && numero > 0 ? numero : null;
}

/** Convierte un campo de formulario a un formato seguro. */
function normalizarCampo(campo) {
  if (!campo || !esTextoConContenido(campo.idCampo)) return null;
  const tipo = TIPOS_CAMPO.includes(campo.tipo) ? campo.tipo : "texto";
  const opciones = comoListaDeTextos(campo.opciones);
  return {
    idCampo: campo.idCampo.trim(),
    etiqueta: comoTexto(campo.etiqueta, campo.idCampo),
    etiquetaCorta: comoTexto(campo.etiquetaCorta, comoTexto(campo.etiqueta, campo.idCampo)),
    tipo: tipo === "seleccion" && opciones.length === 0 ? "texto" : tipo,
    opciones,
    obligatorio: campo.obligatorio === true,
    ayuda: comoTexto(campo.ayuda),
    ejemplo: comoTexto(campo.ejemplo),
  };
}

/**
 * Obtiene la lista de preguntas de personalización.
 * Acepta el nombre de un formulario ("textil") o una lista de campos.
 */
export function resolverCamposPersonalizacion(formulario) {
  const lista = Array.isArray(formulario)
    ? formulario
    : formulariosPersonalizacion[formulario] || formulariosPersonalizacion.general || [];
  const vistos = new Set();
  return lista.map(normalizarCampo).filter((campo) => {
    if (!campo || vistos.has(campo.idCampo)) return false;
    vistos.add(campo.idCampo);
    return true;
  });
}

function normalizarVariantes(variantes) {
  if (!variantes) return null;
  const opciones = comoListaDeTextos(variantes.opciones);
  if (opciones.length === 0) return null;
  return { etiqueta: comoTexto(variantes.etiqueta, "Opción"), opciones };
}

function normalizarLimitesCantidad(minima, maxima) {
  const cantidadMinima = comoEnteroPositivo(minima, 1);
  const cantidadMaxima = Math.max(cantidadMinima, comoEnteroPositivo(maxima, 999));
  return { cantidadMinima, cantidadMaxima };
}

/* ── PRODUCTOS ───────────────────────────────────────────────────────── */
export function normalizarProducto(producto) {
  if (!producto || !esTextoConContenido(producto.idProducto)) return null;
  const precio = normalizarPrecio(producto.precio);
  let tipoPrecio = TIPOS_PRECIO.includes(producto.tipoPrecio) ? producto.tipoPrecio : "consultar";
  if (precio === null) tipoPrecio = "consultar"; // sin número no hay precio que mostrar
  const permiteCompraEstandar = producto.permiteCompraEstandar === true;
  // Si no se indicó ninguna modalidad, se permite al menos pedirlo a medida.
  const permitePersonalizacion = producto.permitePersonalizacion === true || !permiteCompraEstandar;
  const nombre = comoTexto(producto.nombre, "Producto sin nombre");

  return {
    tipoItem: "producto",
    id: producto.idProducto.trim(),
    nombre,
    descripcionCorta: comoTexto(producto.descripcionCorta),
    descripcionExtendida: comoTexto(producto.descripcionExtendida),
    categorias: comoListaDeTextos(producto.categorias),
    etiquetas: comoListaDeTextos(producto.etiquetas),
    imagenPrincipal: comoTexto(producto.imagenPrincipal),
    imagenesAdicionales: comoListaDeTextos(producto.imagenesAdicionales),
    textoAlternativo: comoTexto(producto.textoAlternativo, nombre),
    precio,
    tipoPrecio,
    permiteCompraEstandar,
    permitePersonalizacion,
    camposPersonalizacion: resolverCamposPersonalizacion(producto.formularioPersonalizacion),
    aceptaArchivosReferencia: producto.aceptaArchivosReferencia === true,
    variantes: normalizarVariantes(producto.variantes),
    ...normalizarLimitesCantidad(producto.cantidadMinima, producto.cantidadMaxima),
    destacado: producto.productoDestacado === true,
    visible: producto.mostrarProducto !== false,
    orden: Number.isFinite(producto.orden) ? producto.orden : 999,
    ruta: `/catalogo/${producto.idProducto.trim()}`,
  };
}

/* ── SERVICIOS ───────────────────────────────────────────────────────── */
export function normalizarServicio(servicio) {
  if (!servicio || !esTextoConContenido(servicio.idServicio)) return null;
  const nombre = comoTexto(servicio.nombre, "Servicio");
  return {
    tipoItem: "servicio",
    id: servicio.idServicio.trim(),
    nombre,
    descripcionCorta: comoTexto(servicio.descripcion),
    descripcionExtendida: "",
    incluye: comoListaDeTextos(servicio.incluye),
    categorias: [],
    etiquetas: [],
    imagenPrincipal: comoTexto(servicio.imagen),
    imagenesAdicionales: [],
    textoAlternativo: comoTexto(servicio.textoAlternativo, nombre),
    // Los servicios creativos siempre se cotizan.
    precio: null,
    tipoPrecio: "consultar",
    permiteCompraEstandar: false,
    permitePersonalizacion: servicio.permiteSolicitarPresupuesto !== false,
    camposPersonalizacion: resolverCamposPersonalizacion(servicio.formularioPersonalizacion || "diseno"),
    aceptaArchivosReferencia: true,
    variantes: null,
    cantidadMinima: 1,
    cantidadMaxima: 20,
    disponibilidad: servicio.disponibilidad === "consultar" ? "consultar" : "disponible",
    nota: comoTexto(servicio.nota),
    enlaceNota: comoTexto(servicio.enlaceNota),
    destacado: servicio.destacadoEnInicio === true,
    visible: servicio.mostrarServicio !== false,
    orden: Number.isFinite(servicio.orden) ? servicio.orden : 999,
    ruta: `/servicios/${servicio.idServicio.trim()}`,
  };
}

/* ── CATEGORÍAS ──────────────────────────────────────────────────────── */
export function normalizarCategoria(categoria) {
  if (!categoria || !esTextoConContenido(categoria.idCategoria)) return null;
  return {
    id: categoria.idCategoria.trim(),
    nombre: comoTexto(categoria.nombre, categoria.idCategoria),
    descripcion: comoTexto(categoria.descripcion),
    ilustracion: comoTexto(categoria.ilustracion, "estrella"),
    visible: categoria.mostrarCategoria !== false,
    orden: Number.isFinite(categoria.orden) ? categoria.orden : 999,
  };
}

/* ── EMPRESAS ASOCIADAS ──────────────────────────────────────────────── */
export function normalizarEmpresa(empresa) {
  if (!empresa || !esTextoConContenido(empresa.idEmpresa)) return null;
  return {
    id: empresa.idEmpresa.trim(),
    nombre: comoTexto(empresa.nombre, empresa.idEmpresa),
    categoria: comoTexto(empresa.categoria),
    descripcion: comoTexto(empresa.descripcion),
    proximamente: empresa.estado !== "activo",
    sitioWeb: esEnlaceExterno(empresa.sitioWeb) ? empresa.sitioWeb.trim() : "",
    instagram: esEnlaceExterno(empresa.instagram) ? empresa.instagram.trim() : "",
    logo: comoTexto(empresa.logo),
    colorAcento: empresa.colorAcento === "naranja" ? "naranja" : "lavanda",
    visible: empresa.mostrarEmpresa !== false,
    orden: Number.isFinite(empresa.orden) ? empresa.orden : 999,
    ruta: `/otros-servicios/${empresa.idEmpresa.trim()}`,
  };
}

/** Solo acepta enlaces http/https (evita enlaces vacíos o inseguros). */
export function esEnlaceExterno(valor) {
  return esTextoConContenido(valor) && /^https?:\/\/[^\s]+$/i.test(valor.trim());
}

/** Ordena por el campo "orden" y descarta los datos inválidos (null). */
export function ordenarValidos(lista, normalizar) {
  const vistos = new Set();
  return comoLista(lista)
    .map(normalizar)
    .filter((item) => {
      if (!item || vistos.has(item.id)) return false; // ids repetidos: vale el primero
      vistos.add(item.id);
      return true;
    })
    .sort((a, b) => a.orden - b.orden);
}
