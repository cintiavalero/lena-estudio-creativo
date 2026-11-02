/* =====================================================================
   ARMADO DEL FEED "DESCUBRÍ" (inicio)
   ---------------------------------------------------------------------
   ⚙️  ARCHIVO TÉCNICO.
   Arma la lista mezclada de productos, accesos a categorías y servicios,
   y la reparte en columnas tipo mosaico. Los datos salen del catálogo
   (fuente única de verdad): acá no se define ningún producto.

   La mezcla usa una "semilla" que se guarda mientras la pestaña está
   abierta: al volver atrás desde un producto el orden se mantiene, y en
   una visita nueva se genera otro orden.
   ===================================================================== */

const CLAVE_SEMILLA = "lena-feed-semilla";
const CLAVE_POSICION = "lena-feed-posicion";
const CLAVE_PORTADAS = "lena-feed-portadas-alternativas";

/** Generador de números aleatorios reproducible a partir de una semilla. */
function crearAleatorio(semilla) {
  let estado = semilla >>> 0;
  return () => {
    estado = (estado + 0x6d2b79f5) >>> 0;
    let t = estado;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Mezcla una lista (Fisher-Yates) usando el generador dado. */
function mezclarLista(lista, aleatorio) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(aleatorio() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function nuevaSemilla() {
  return 1 + Math.floor(Math.random() * (2 ** 31 - 1));
}

// Datos de esta carga de la página (se reinician al recargar o al volver a entrar).
let semillaDeEstaCarga = null;
let portadasAlternativasDeEstaCarga = false;
let vecesQueSeMostroElFeed = 0;

/** Tipo de entrada al sitio: "navigate", "reload" o "back_forward". */
function tipoDeEntradaAlSitio() {
  try {
    return window.performance?.getEntriesByType?.("navigation")?.[0]?.type || "navigate";
  } catch {
    return "navigate";
  }
}

/**
 * Semilla del orden aleatorio.
 * - Al entrar o recargar el sitio: orden nuevo.
 * - Al volver atrás (dentro del sitio o con el botón del navegador): mismo orden.
 */
export function obtenerSemillaDeVisita() {
  if (semillaDeEstaCarga) return semillaDeEstaCarga;
  let semilla = null;
  try {
    if (tipoDeEntradaAlSitio() === "back_forward") {
      const guardada = Number(window.sessionStorage.getItem(CLAVE_SEMILLA));
      if (Number.isInteger(guardada) && guardada > 0) semilla = guardada;
    }
  } catch {
    semilla = null;
  }
  if (!semilla) semilla = nuevaSemilla();
  guardarSemilla(semilla);
  // Las portadas alternativas (después de "Mezclar") solo se mantienen al volver atrás.
  let alternativas = false;
  try {
    alternativas = tipoDeEntradaAlSitio() === "back_forward" && window.sessionStorage.getItem(CLAVE_PORTADAS) === "1";
  } catch {
    alternativas = false;
  }
  guardarPortadasAlternativas(alternativas);
  return semilla;
}

/** ¿Se están mostrando fotos adicionales como portada (después de "Mezclar")? */
export function obtenerPortadasAlternativas() {
  if (!semillaDeEstaCarga) obtenerSemillaDeVisita();
  return portadasAlternativasDeEstaCarga;
}

export function guardarPortadasAlternativas(valor) {
  portadasAlternativasDeEstaCarga = Boolean(valor);
  try {
    window.sessionStorage.setItem(CLAVE_PORTADAS, valor ? "1" : "0");
  } catch {
    // sin almacenamiento
  }
}

export function guardarSemilla(semilla) {
  semillaDeEstaCarga = semilla;
  try {
    window.sessionStorage.setItem(CLAVE_SEMILLA, String(semilla));
  } catch {
    // sin almacenamiento: el feed igual funciona
  }
}

/** ¿Hay que retomar la posición anterior del feed? */
export function debeRetomarPosicion(tipoNavegacionDelSitio) {
  vecesQueSeMostroElFeed += 1;
  if (vecesQueSeMostroElFeed === 1) return tipoDeEntradaAlSitio() === "back_forward";
  return tipoNavegacionDelSitio === "POP";
}

/** Recuerda cuántos elementos había cargados y dónde estaba el scroll. */
export function guardarPosicionFeed(posicion) {
  try {
    window.sessionStorage.setItem(CLAVE_POSICION, JSON.stringify(posicion));
  } catch {
    // sin almacenamiento
  }
}

export function leerPosicionFeed() {
  try {
    const datos = JSON.parse(window.sessionStorage.getItem(CLAVE_POSICION) || "null");
    return datos && Number.isFinite(datos.cantidadVisible) && Number.isFinite(datos.scrollY) ? datos : null;
  } catch {
    return null;
  }
}

// Formatos de los mosaicos (ancho / alto) para que el feed no sea una grilla rígida.
const FORMATOS = [
  { proporcion: "4 / 5", alto: 1.25 },
  { proporcion: "3 / 4", alto: 1.333 },
  { proporcion: "1 / 1", alto: 1 },
  { proporcion: "4 / 5", alto: 1.25 },
  { proporcion: "2 / 3", alto: 1.5 },
];

const fotosDe = (item) => [item.imagenPrincipal, ...(item.imagenesAdicionales || [])].filter(Boolean);

/**
 * Arma la lista del feed.
 * @returns {Array} elementos { clave, tipo: "producto"|"categoria"|"servicio", ... }
 */
export function armarFeed({ productos, categorias, servicios, semilla, configuracion, portadasAlternativas = false }) {
  const aleatorio = crearAleatorio(semilla);
  const mezclar = configuracion.mezclarEnCadaVisita !== false;

  // 1) Productos: mezclados; con foto y destacados primero si así se configuró.
  const productosOrdenados = productos
    .map((producto, indice) => {
      let clave = mezclar ? aleatorio() : indice / productos.length;
      if (configuracion.priorizarProductosConFoto) {
        if (producto.destacado) clave -= 0.35;
        if (fotosDe(producto).length === 0) clave += 0.9;
      }
      return { producto, clave };
    })
    .sort((a, b) => a.clave - b.clave)
    .map(({ producto }) => producto);

  // 1b) Evitar portadas repetidas: varios productos pueden compartir una foto.
  //     Cada producto usa como portada una foto que todavía no se mostró;
  //     si todas sus fotos ya aparecieron, el producto pasa más abajo.
  const portadasUsadas = new Set();
  const sinRepetir = [];
  const conFotoRepetida = [];
  for (const producto of productosOrdenados) {
    const fotos = fotosDe(producto);
    if (fotos.length === 0) {
      sinRepetir.push({ producto, fotos });
      continue;
    }
    // Después de "Mezclar", si hay fotos adicionales se elige una de ellas como portada.
    const candidatas =
      portadasAlternativas && fotos.length > 1 ? [...mezclarLista(fotos.slice(1), aleatorio), fotos[0]] : fotos;
    const portada = candidatas.find((foto) => !portadasUsadas.has(foto));
    if (portada) {
      portadasUsadas.add(portada);
      sinRepetir.push({ producto, fotos: [portada, ...fotos.filter((foto) => foto !== portada)] });
    } else {
      conFotoRepetida.push({ producto, fotos });
    }
  }
  const productosParaMostrar = [...sinRepetir, ...conFotoRepetida];

  // 2) Accesos a categorías, con una foto de algún producto de esa categoría.
  const accesosCategorias = (mezclar ? mezclarLista(categorias, aleatorio) : categorias)
    .map((categoria) => {
      const deLaCategoria = productos.filter((producto) => producto.categorias.includes(categoria.id));
      // Solo fotos que no se usan como portada de un producto (así no se repiten).
      const fotosLibres = [...new Set(deLaCategoria.flatMap(fotosDe))].filter((foto) => !portadasUsadas.has(foto));
      const imagen = fotosLibres.length ? fotosLibres[Math.floor(aleatorio() * fotosLibres.length)] : "";
      if (imagen) portadasUsadas.add(imagen);
      return {
        clave: `categoria-${categoria.id}`,
        tipo: "categoria",
        categoria,
        cantidad: deLaCategoria.length,
        imagen,
        formato: FORMATOS[2],
      };
    })
    .filter((acceso) => acceso.cantidad > 0);

  // 3) Servicios creativos con foto.
  const accesosServicios = (mezclar ? mezclarLista(servicios, aleatorio) : servicios)
    .filter((servicio) => servicio.imagenPrincipal && !portadasUsadas.has(servicio.imagenPrincipal))
    .map((servicio) => ({ clave: `servicio-${servicio.id}`, tipo: "servicio", servicio, formato: FORMATOS[0] }));

  // 4) Intercalar.
  const cadaCategoria = Math.max(0, Math.floor(configuracion.cadaCuantosProductosUnaCategoria || 0));
  const cadaServicio = Math.max(0, Math.floor(configuracion.cadaCuantosProductosUnServicio || 0));
  const feed = [];
  productosParaMostrar.forEach(({ producto, fotos }, indice) => {
    feed.push({
      clave: `producto-${producto.id}`,
      tipo: "producto",
      producto,
      fotos,
      formato: FORMATOS[Math.floor(aleatorio() * FORMATOS.length)],
    });
    const posicion = indice + 1;
    if (cadaCategoria && posicion % cadaCategoria === 0 && accesosCategorias.length) feed.push(accesosCategorias.shift());
    if (cadaServicio && posicion % cadaServicio === 0 && accesosServicios.length) feed.push(accesosServicios.shift());
  });
  return feed;
}

/**
 * Reparte los elementos en columnas, siempre en la columna más corta,
 * para lograr el efecto mosaico. Agregar elementos al final nunca
 * cambia el lugar de los anteriores.
 */
export function repartirEnColumnas(elementos, cantidadColumnas) {
  const columnas = Array.from({ length: cantidadColumnas }, () => ({ alto: 0, elementos: [] }));
  for (const elemento of elementos) {
    const destino = columnas.reduce((menor, columna) => (columna.alto < menor.alto ? columna : menor), columnas[0]);
    destino.elementos.push(elemento);
    // El texto debajo de los productos suma un poco de alto.
    destino.alto += elemento.formato.alto + (elemento.tipo === "producto" ? 0.28 : 0.05);
  }
  return columnas.map((columna) => columna.elementos);
}
