/* =====================================================================
   PANTALLA DE INICIO · FEED "DESCUBRÍ"
   ---------------------------------------------------------------------
   ✏️  ARCHIVO EDITABLE.
   El inicio muestra un mosaico de productos en orden aleatorio, como
   en una red social. Acá se ajusta cómo se arma.
   Los textos (título, botones) están en textosSitio.js → inicio.
   ===================================================================== */

const configuracionInicio = {
  // true = el inicio arranca con el feed de productos.
  mostrarFeed: true,

  // true = además del feed, muestra arriba la presentación grande
  // con el collage de fotos (la portada anterior).
  mostrarPresentacionGrande: false,

  // true = el orden cambia en cada visita al sitio.
  // false = siempre el mismo orden (según el número "orden" de cada producto).
  mezclarEnCadaVisita: true,

  // true = los productos con foto y los destacados salen primero
  // (siguen mezclados entre sí). Recomendado mientras falten fotos.
  priorizarProductosConFoto: true,

  // true = al tocar "Mezclar", los productos con fotos adicionales muestran
  // una de esas fotos como portada (en vez de la principal), para que
  // parezca que hay cosas nuevas para ver. La principal sigue en la galería.
  alMezclarMostrarFotoAdicional: true,

  // Cuántos productos se cargan cada vez que la persona llega al final.
  productosPorTanda: 12,

  // Cada cuántos productos aparece un acceso a una categoría
  // ("Ver todo Merch & Regalos"). 0 = no mostrar.
  cadaCuantosProductosUnaCategoria: 7,

  // Cada cuántos productos aparece un servicio creativo. 0 = no mostrar.
  cadaCuantosProductosUnServicio: 11,
};

export default configuracionInicio;
