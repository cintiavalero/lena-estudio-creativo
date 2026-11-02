/* =====================================================================
   PRODUCTOS · OFICINA & EDUCACIÓN
   ---------------------------------------------------------------------
   ✏️  ARCHIVO EDITABLE.
   Acá están los productos cuya categoría PRINCIPAL (la primera de la
   lista "categorias") es Oficina & Educación.

   ¿Qué significa cada dato? ¿Cómo agrego un producto o un precio?
   → Está explicado, con ejemplos, en  todosLosProductos.js  (esta misma
     carpeta) y en el archivo LEEME.md.

   Para agregar un producto: copiá un bloque completo, desde  {  hasta  },
   pegalo debajo del último y cambiá sus datos. El "idProducto" no se
   puede repetir en ningún archivo.
   ===================================================================== */

const productos = [
  {
    idProducto: "etiquetas-escolares",
    nombre: "Etiquetas escolares",
    descripcionCorta: "Para útiles, cuadernos y ropa, con nombre y diseño.",
    descripcionExtendida: "",
    categorias: ["oficina-educacion", "papeleria-impresos"],
    etiquetas: ["escolar", "etiquetas", "útiles", "colegio"],
    imagenPrincipal: "",
    imagenesAdicionales: [],
    textoAlternativo: "Etiquetas escolares",
    ilustracion: "etiqueta",
    precio: null,
    tipoPrecio: "consultar",
    permiteCompraEstandar: false,
    permitePersonalizacion: true,
    formularioPersonalizacion: "papeleria",
    aceptaArchivosReferencia: true,
    variantes: null,
    cantidadMinima: 1,
    cantidadMaxima: 1000,
    productoDestacado: false,
    mostrarProducto: true,
    orden: 905,
  },
  {
    idProducto: "material-didactico",
    nombre: "Material didáctico y flashcards",
    descripcionCorta: "Tarjetas y láminas para enseñar y aprender jugando.",
    descripcionExtendida: "",
    categorias: ["oficina-educacion"],
    etiquetas: ["didáctico", "flashcards", "docente", "aula"],
    imagenPrincipal: "",
    imagenesAdicionales: [],
    textoAlternativo: "Material didáctico y flashcards",
    ilustracion: "manzana",
    precio: null,
    tipoPrecio: "consultar",
    permiteCompraEstandar: false,
    permitePersonalizacion: true,
    formularioPersonalizacion: "papeleria",
    aceptaArchivosReferencia: true,
    variantes: null,
    cantidadMinima: 1,
    cantidadMaxima: 1000,
    productoDestacado: false,
    mostrarProducto: true,
    orden: 910,
  },
  {
    idProducto: "kits-docentes",
    nombre: "Kits para docentes",
    descripcionCorta: "Planificador, stickers y papelería para arrancar el año.",
    descripcionExtendida: "",
    categorias: ["oficina-educacion", "papeleria-impresos"],
    etiquetas: ["docente", "maestra", "kit", "aula"],
    imagenPrincipal: "",
    imagenesAdicionales: [],
    textoAlternativo: "Kits para docentes",
    ilustracion: "manzana",
    precio: null,
    tipoPrecio: "consultar",
    permiteCompraEstandar: false,
    permitePersonalizacion: true,
    formularioPersonalizacion: "papeleria",
    aceptaArchivosReferencia: true,
    variantes: null,
    cantidadMinima: 1,
    cantidadMaxima: 1000,
    productoDestacado: false,
    mostrarProducto: true,
    orden: 915,
  },
  {
    idProducto: "organizadores-escritorio",
    nombre: "Organizadores de escritorio",
    descripcionCorta: "Planners de escritorio, notas y piezas para ordenar el día.",
    descripcionExtendida: "",
    categorias: ["oficina-educacion"],
    etiquetas: ["escritorio", "organizador", "oficina"],
    imagenPrincipal: "",
    imagenesAdicionales: [],
    textoAlternativo: "Organizadores de escritorio",
    ilustracion: "cuaderno",
    precio: null,
    tipoPrecio: "consultar",
    permiteCompraEstandar: false,
    permitePersonalizacion: true,
    formularioPersonalizacion: "papeleria",
    aceptaArchivosReferencia: true,
    variantes: null,
    cantidadMinima: 1,
    cantidadMaxima: 1000,
    productoDestacado: false,
    mostrarProducto: true,
    orden: 920,
  },
];

export default productos;
