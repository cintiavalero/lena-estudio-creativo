/* =====================================================================
   TEXTOS DEL SITIO
   ---------------------------------------------------------------------
   ✏️  ARCHIVO EDITABLE.
   Todos los títulos, bajadas y textos de botones de cada página.
   Cambiá solo lo que está entre comillas. Si un texto lleva comillas
   adentro, usá comillas simples ' ' o « ».
   ===================================================================== */

const textosSitio = {
  // ── INICIO ───────────────────────────────────────────────────────────
  inicio: {
    tituloPagina: "Diseño gráfico y productos personalizados",
    heroTitulo: "Diseño que se puede tocar.",
    heroBajada:
      "Identidad visual, papelería, merch y packaging personalizados para personas, emprendimientos y empresas. Te acompañamos desde la idea hasta la pieza terminada.",
    heroBotonCatalogo: "Explorar el catálogo",
    heroBotonPresupuesto: "Pedir un presupuesto",
    // Fotos del collage del inicio (hasta 3). Se toman de la carpeta public/imagenes/
    heroImagenes: [
      { archivo: "/imagenes/productos/agenda-personalizada.jpg", textoAlternativo: "Agenda con tapa de hojas tropicales" },
      { archivo: "/imagenes/productos/tarjetas-presentacion.jpg", textoAlternativo: "Tarjetas de presentación en blanco y negro" },
      { archivo: "/imagenes/productos/stickers-etiquetas.jpg", textoAlternativo: "Stickers para el packaging de una tienda" },
    ],

    destacadosTitulo: "Del catálogo",
    destacadosBajada: "Modelos listos para pedir y piezas que adaptamos a tu idea.",
    destacadosEnlace: "Ver todo el catálogo",

    serviciosTitulo: "Servicios creativos",
    serviciosBajada: "Antes de imprimir, diseñamos. Esto es lo que podemos crear con vos.",
    serviciosEnlace: "Ver todos los servicios",

    sobreTitulo: "Sobre LENA",
    sobreFrase: "Un estudio creativo que une diseño gráfico y productos personalizados.",
    sobreTexto:
      "Trabajamos con personas que buscan un regalo único, con emprendimientos que necesitan presentarse bien y con empresas que quieren piezas coherentes con su marca. Cada pedido empieza escuchando y termina en algo que se puede usar, regalar o mostrar.",
    pasosTitulo: "Cómo pedir",
    pasos: [
      { titulo: "Armá tu pedido", texto: "Sumá productos del catálogo o pedí una versión a medida." },
      { titulo: "Envialo por WhatsApp", texto: "El sitio escribe el mensaje con todo el detalle." },
      { titulo: "Recibí la cotización", texto: "Te respondemos con el presupuesto de lo personalizado." },
      { titulo: "Diseño y entrega", texto: "Ajustamos los detalles con vos y coordinamos la entrega." },
    ],

    asociadasTitulo: "Otros servicios",
    asociadasBajada: "Para lo que va más allá del diseño, trabajamos con empresas asociadas.",

    contactoTitulo: "¿Tenés una idea?",
    contactoBajada: "Escribinos y la pensamos juntos. Consultas, presupuestos y pedidos por WhatsApp.",
  },

  // ── CATÁLOGO ─────────────────────────────────────────────────────────
  catalogo: {
    tituloPagina: "Catálogo",
    titulo: "Catálogo",
    bajada: "Elegí un modelo de LENA o pedilo a tu medida. Lo personalizado se cotiza por WhatsApp.",
    textoBuscador: "Buscar en el catálogo",
    ejemploBuscador: "Agenda, stickers, caja…",
    textoTodas: "Todo",
    sinResultadosTitulo: "No encontramos productos con esa búsqueda.",
    sinResultadosTexto: "Probá con otra palabra o escribinos: si lo podemos hacer, te lo cotizamos.",
    botonLimpiar: "Ver todo el catálogo",
  },

  // ── FICHA DE PRODUCTO / SERVICIO ────────────────────────────────────
  ficha: {
    volverCatalogo: "Volver al catálogo",
    volverServicios: "Volver a servicios",
    pestanaEstandar: "Modelo del catálogo",
    pestanaPersonalizada: "Personalizado",
    botonAgregar: "Agregar al carrito",
    botonPersonalizar: "Personalizar este producto",
    botonSolicitarMedida: "Solicitar a medida",
    botonSolicitarServicio: "Sumar al pedido",
    botonGuardarCambios: "Guardar cambios",
    textoCantidad: "Cantidad",
    textoObservaciones: "Observaciones",
    ejemploObservaciones: "Algo más que quieras contarnos",
    avisoPersonalizado: "Lo personalizado se cotiza según lo que pidas. Te pasamos el precio por WhatsApp.",
    noEncontrado: "Este producto no está disponible.",
    tituloVariantes: "Opciones",
  },

  // ── SERVICIOS ────────────────────────────────────────────────────────
  servicios: {
    tituloPagina: "Servicios creativos",
    titulo: "Servicios creativos",
    bajada:
      "Diseño de marca, piezas gráficas y contenido visual. Contanos qué necesitás y te pasamos un presupuesto a medida.",
    textoIncluye: "Incluye",
    botonPresupuesto: "Pedir presupuesto",
    textoConsultar: "Consultá disponibilidad",
  },

  // ── OTROS SERVICIOS ─────────────────────────────────────────────────
  otrosServicios: {
    tituloPagina: "Otros servicios",
    titulo: "Otros servicios",
    bajada:
      "LENA trabaja junto a empresas asociadas para sumar soluciones que no presta de forma directa. Cada empresa es responsable de su propio servicio.",
    textoProximamente: "Próximamente",
    textoDetalleProximamente: "Muy pronto vas a encontrar acá más información y el acceso a su sitio.",
    botonSitio: "Visitar sitio web",
    botonInstagram: "Ver en Instagram",
    botonVer: "Conocer más",
    volver: "Volver a LENA",
    volverListado: "Ver otros servicios",
    aclaracion: "Servicio prestado por una empresa asociada a LENA.",
  },

  // ── CONTACTO ─────────────────────────────────────────────────────────
  contacto: {
    tituloPagina: "Contacto",
    titulo: "Contacto",
    bajada:
      "La forma más rápida de consultar es por WhatsApp. Si ya sabés lo que querés, armá tu pedido en el catálogo y envialo desde el carrito.",
    botonWhatsapp: "Escribir por WhatsApp",
    mensajeWhatsappContacto: "¡Hola LENA! Quería hacerles una consulta.",
    botonCatalogo: "Armar un pedido",
    sinDatos: "Los datos de contacto se están actualizando.",
  },

  // ── CARRITO Y FINALIZACIÓN ──────────────────────────────────────────
  carrito: {
    tituloPagina: "Tu pedido",
    titulo: "Tu pedido",
    tituloPanel: "Tu pedido",
    vacioTitulo: "Tu pedido está vacío",
    vacioTexto: "Recorré el catálogo y sumá lo que quieras pedir o cotizar.",
    botonSeguir: "Seguir mirando",
    botonVerPedido: "Ver pedido completo",
    botonFinalizar: "Finalizar pedido",
    botonEditar: "Editar",
    botonQuitar: "Quitar",
    botonVaciar: "Vaciar pedido",
    avisoAgregado: "Agregado a tu pedido",
    modalidadEstandar: "Producto del catálogo",
    modalidadPersonalizada: "Personalizado",
    modalidadServicio: "Servicio creativo",
    textoSubtotalConocido: "Subtotal de productos con precio",
    textoPendientes: "Pendientes de cotización",
    textoTotal: "Total",
    avisoPendientes:
      "Hay productos sin precio definido. Te pasamos el total final por WhatsApp.",
    noDisponible: "Este producto ya no está disponible. Quitalo para continuar.",
    avisoOrientativo: "Los precios publicados son orientativos hasta confirmar el pedido.",
  },

  finalizar: {
    tituloPagina: "Finalizar pedido",
    titulo: "Revisá tu pedido",
    bajada: "Controlá los detalles. Al enviarlo se abre WhatsApp con el mensaje listo.",
    tituloDatos: "Tus datos (opcional)",
    botonEnviar: "Enviar pedido por WhatsApp",
    botonCopiar: "Copiar mensaje",
    textoCopiado: "Mensaje copiado",
    botonAbrirChat: "Abrir WhatsApp sin mensaje",
    verMensaje: "Ver el mensaje que se va a enviar",
    avisoEnvio:
      "Se abrió WhatsApp con tu pedido escrito. Recordá tocar «Enviar» en WhatsApp: el pedido nos llega recién cuando lo mandás.",
    avisoLargo:
      "Tu pedido es largo y algunos teléfonos no abren mensajes tan extensos. Si WhatsApp aparece vacío, copiá el mensaje y pegalo en el chat.",
    avisoSinNumero:
      "El número de WhatsApp de LENA todavía no está configurado. Podés copiar el mensaje y enviarlo por otro medio.",
    volverCarrito: "Volver al pedido",
  },

  // ── PÁGINA NO ENCONTRADA ─────────────────────────────────────────────
  noEncontrada: {
    tituloPagina: "Página no encontrada",
    titulo: "Esta página no existe.",
    texto: "Puede que el enlace esté mal escrito o que la página se haya movido.",
    boton: "Ir al inicio",
  },

  // ── PIE DE PÁGINA ───────────────────────────────────────────────────
  piePagina: {
    textoMarca: "Diseño gráfico, identidad visual y productos personalizados.",
    tituloNavegacion: "Navegación",
    tituloContacto: "Contacto",
    derechos: "Todos los derechos reservados.",
  },
};

export default textosSitio;
