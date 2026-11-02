/* =====================================================================
   CARRITO, PRECIOS Y MENSAJE DE WHATSAPP
   ---------------------------------------------------------------------
   ✏️  ARCHIVO EDITABLE.
   Textos y reglas del carrito y del mensaje que se arma para WhatsApp.
   El NÚMERO de WhatsApp se configura en configuracionSitio.js.
   ===================================================================== */

const configuracionPedidos = {
  // Moneda y formato de precios (pesos argentinos).
  moneda: "ARS",
  formatoRegional: "es-AR",

  // Textos que se muestran cuando no hay un precio definido.
  textoSinPrecio: "Consultar precio", //            en tarjetas y fichas
  textoACotizar: "Precio a cotizar por WhatsApp", // productos personalizados en el carrito
  textoAConfirmar: "Precio a confirmar", //         modelos "desde" o sin precio publicado
  textoTotalPendiente: "A confirmar por WhatsApp",

  // Primera y última línea del mensaje de WhatsApp.
  mensajeInicial: "¡Hola LENA! 👋 Quisiera consultar por el siguiente pedido:",
  mensajeFinal: "Quedo a la espera de la cotización y confirmación. ¡Gracias!",

  // Aviso que se agrega al mensaje si hay productos que aceptan
  // imágenes de referencia.
  recordatorioArchivos: "Te envío a continuación las imágenes o archivos de referencia.",

  // Datos opcionales que se piden al finalizar el pedido.
  // Para quitar uno, cambiá  mostrar: true  por  mostrar: false
  camposOpcionalesPedido: [
    { idCampo: "nombre", etiqueta: "Tu nombre", tipo: "texto", mostrar: true, ejemplo: "Cómo te llamás" },
    {
      idCampo: "comentarios",
      etiqueta: "Comentarios generales",
      tipo: "textoLargo",
      mostrar: true,
      ejemplo: "Fecha en que lo necesitás, forma de entrega, dudas…",
    },
  ],

  // Si el mensaje supera este largo, además del botón se sugiere
  // copiar el texto y pegarlo en WhatsApp (los links muy largos
  // pueden fallar en algunos teléfonos). No hace falta cambiarlo.
  largoMaximoEnlace: 3500,
};

export default configuracionPedidos;
