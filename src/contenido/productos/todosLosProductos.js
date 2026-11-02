/* =====================================================================
   TODOS LOS PRODUCTOS · GUÍA Y UNIÓN DE ARCHIVOS
   ---------------------------------------------------------------------
   Los productos están repartidos en un archivo por categoría, en esta
   misma carpeta (papeleriaImpresos.js, merchRegalos.js, etc.). Cada
   producto va en el archivo de su categoría PRINCIPAL (la primera de su
   lista "categorias"), y se define UNA sola vez.

   Lo que cambies en esos archivos se actualiza solo en el inicio, el
   catálogo, el detalle del producto, el carrito y el mensaje de WhatsApp.

   Este archivo hace dos cosas:
   1) Explica qué significa cada dato (abajo).
   2) Junta todos los archivos (al final). ⚙️ Solo hay que tocar esa
      parte si creás un archivo de productos NUEVO.

   Cada producto es un bloque { ... } separado por comas.

   ── QUÉ SIGNIFICA CADA DATO ──────────────────────────────────────────
   idProducto            Nombre interno único, en minúsculas, con guiones
                         y sin tildes. También es la dirección web del
                         producto (/catalogo/agendas-personalizadas).
                         ⚠️ Si lo cambiás, los carritos guardados con el
                         nombre viejo marcan ese producto como "no disponible".
   nombre                Nombre visible.
   descripcionCorta      Una o dos líneas para las tarjetas del catálogo.
   descripcionExtendida  Texto más largo para la página del producto
                         (opcional: dejalo "" si no hace falta).
   categorias            Lista de categorías (ver categorias.js).
                         Un producto puede estar en varias sin repetirse.
   etiquetas             Palabras que ayudan al buscador.
   imagenPrincipal       Foto principal. Las fotos van en la carpeta
                         public/imagenes/productos/ y acá se escribe
                         "/imagenes/productos/nombre-del-archivo.jpg".
                         Si queda "" se muestra un dibujo de respaldo.
   imagenesAdicionales   Más fotos (opcional). Misma forma que la principal.
   textoAlternativo      Descripción de la foto para personas que usan
                         lectores de pantalla y para Google.
   ilustracion           Dibujo que se muestra mientras el producto no
                         tenga foto. Opciones: "papel", "caja", "bolsa",
                         "remera", "gorra", "delantal", "bandera", "regalo",
                         "taza", "mate", "termo", "llavero", "chapita",
                         "lapicera", "corazon", "flor", "corbata", "arbol",
                         "huevo", "globo", "birrete", "manzana", "evento",
                         "banderines", "credencial", "cartel", "negocio",
                         "cuadro", "almohadon", "cuaderno", "etiqueta",
                         "estrella". Si queda "", se usa el de su categoría.
   precio                Número SIN signo $ y SIN puntos. Ej: 8500
                         Si no hay precio, escribí null.
   tipoPrecio            "fijo"      → muestra "$ 8.500" y se suma en el carrito.
                         "desde"     → muestra "Desde $ 8.500"; en el carrito
                                       queda como "a confirmar".
                         "consultar" → muestra "Consultar precio".
   permiteCompraEstandar true si se puede pedir el modelo del catálogo tal
                         como se ve (botón "Agregar al carrito").
   permitePersonalizacion true si se puede pedir una versión a medida
                         (botón "Personalizar este producto").
                         Lo personalizado SIEMPRE queda "a cotizar",
                         aunque el modelo estándar tenga precio.
   formularioPersonalizacion  Qué preguntas se hacen al personalizar
                         (ver personalizaciones.js): "general", "textil",
                         "packaging", "papeleria", "eventos", "granFormato",
                         "regalos", "diseno".
   aceptaArchivosReferencia true para avisar que puede mandar su logo o
                         imagen por WhatsApp.
   variantes             Opcional. Opciones del modelo estándar que el
                         cliente elige (ej: formato de agenda). Si no
                         aplica, dejá  variantes: null,
   cantidadMinima / cantidadMaxima  Límites de cantidad por pedido.
   productoDestacado     true = aparece en "Destacados" del inicio.
   mostrarProducto       true = visible / false = oculto (no se borra).
   orden                 Número para ordenar (el más chico va primero).

   ── EJEMPLO: producto con precio ─────────────────────────────────────
   Para publicar un precio fijo de $8.500 en un producto, cambiá:
       precio: null,              tipoPrecio: "consultar",
   por:
       precio: 8500,              tipoPrecio: "fijo",

   ── EJEMPLO: agregar un producto nuevo ───────────────────────────────
   1) Copiá la foto en  public/imagenes/productos/taza-lena.jpg
   2) Abrí el archivo de su categoría principal (acá: merchRegalos.js),
      copiá este bloque y pegalo al final de la lista, antes del  ];
     {
       idProducto: "tazas-personalizadas",
       nombre: "Tazas personalizadas",
       descripcionCorta: "Tazas con tu diseño, nombre o logo.",
       descripcionExtendida: "",
       categorias: ["merch-regalos"],
       etiquetas: ["taza", "regalo"],
       imagenPrincipal: "/imagenes/productos/taza-lena.jpg",
       imagenesAdicionales: [],
       textoAlternativo: "Taza blanca con diseño de LENA",
       ilustracion: "taza",
       precio: 9500,
       tipoPrecio: "fijo",
       permiteCompraEstandar: true,
       permitePersonalizacion: true,
       formularioPersonalizacion: "general",
       aceptaArchivosReferencia: true,
       variantes: null,
       cantidadMinima: 1,
       cantidadMaxima: 200,
       productoDestacado: false,
       mostrarProducto: true,
       orden: 200,
     },
   ===================================================================== */

import papeleriaImpresos from "./papeleriaImpresos.js";
import packagingCajas from "./packagingCajas.js";
import textilEstampados from "./textilEstampados.js";
import merchRegalos from "./merchRegalos.js";
import eventosCelebraciones from "./eventosCelebraciones.js";
import carteleriaGranFormato from "./carteleriaGranFormato.js";
import emprendedoresNegocios from "./emprendedoresNegocios.js";
import decoracionPersonalizados from "./decoracionPersonalizados.js";
import oficinaEducacion from "./oficinaEducacion.js";
import temporadasFechasEspeciales from "./temporadasFechasEspeciales.js";

/* ⚙️ Unión de todos los archivos. Si creás un archivo nuevo de productos,
   importalo arriba (copiando una línea "import") y sumalo a esta lista. */
const todosLosProductos = [
  ...papeleriaImpresos,
  ...packagingCajas,
  ...textilEstampados,
  ...merchRegalos,
  ...eventosCelebraciones,
  ...carteleriaGranFormato,
  ...emprendedoresNegocios,
  ...decoracionPersonalizados,
  ...oficinaEducacion,
  ...temporadasFechasEspeciales,
];

export default todosLosProductos;
