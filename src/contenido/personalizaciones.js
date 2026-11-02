/* =====================================================================
   FORMULARIOS DE PERSONALIZACIÓN
   ---------------------------------------------------------------------
   ✏️  ARCHIVO EDITABLE.
   Cuando alguien elige "Personalizar este producto" o "Solicitar a
   medida", completa un formulario corto. Acá se definen las preguntas.

   Cada producto elige su formulario (en los archivos de la carpeta
   productos/) con la línea:
       formularioPersonalizacion: "textil",
   (o el nombre de cualquier formulario de esta lista).

   La CANTIDAD siempre se pregunta, no hace falta agregarla.

   Cada pregunta (campo) tiene:
   - idCampo: nombre interno, sin espacios ni tildes. No repetir dentro
     del mismo formulario.
   - etiqueta: la pregunta que lee el cliente.
   - etiquetaCorta: cómo aparece ese dato en el carrito y en el mensaje
     de WhatsApp (opcional; si falta, se usa la etiqueta).
   - tipo: "texto" (una línea), "textoLargo" (varias líneas),
           "seleccion" (lista de opciones) o "fecha".
   - opciones: solo para tipo "seleccion". Lista de textos.
   - obligatorio: true si hay que completarla, false si es opcional.
   - ayuda: texto chico de ayuda debajo de la pregunta (opcional).
   - ejemplo: texto gris de ejemplo dentro del casillero (opcional).

   ── EJEMPLO: agregar una pregunta a un formulario ────────────────────
   Copiá este bloque dentro de la lista del formulario que quieras:
     {
       idCampo: "tipografia",
       etiqueta: "Tipografía preferida",
       tipo: "seleccion",
       opciones: ["Manuscrita", "Moderna", "Clásica", "Que la elija LENA"],
       obligatorio: false,
     },
   ===================================================================== */

// Preguntas que se repiten en casi todos los formularios.
// Se definen una sola vez y se reutilizan abajo.
const descripcionPedido = {
  idCampo: "descripcion",
  etiqueta: "¿Qué te imaginás?",
  etiquetaCorta: "Personalización",
  tipo: "textoLargo",
  obligatorio: true,
  ejemplo: "Contanos la idea, el estilo, para quién es o para qué lo vas a usar.",
};
const textoIncluido = {
  idCampo: "textoIncluido",
  etiqueta: "Texto a incluir",
  tipo: "texto",
  obligatorio: false,
  ejemplo: "Nombres, frase, fecha, nombre de tu marca…",
};
const coloresPreferidos = {
  idCampo: "colores",
  etiqueta: "Colores preferidos",
  tipo: "texto",
  obligatorio: false,
  ejemplo: "Ej: tonos pastel, los colores de mi marca",
};

export const formulariosPersonalizacion = {
  // Formulario general: sirve para cualquier producto.
  general: [descripcionPedido, textoIncluido, coloresPreferidos],

  // Prendas y tote bags
  textil: [
    descripcionPedido,
    {
      idCampo: "talle",
      etiqueta: "Talle",
      tipo: "seleccion",
      opciones: ["XS", "S", "M", "L", "XL", "XXL", "Talles combinados (detallar en observaciones)", "No aplica"],
      obligatorio: false,
    },
    {
      idCampo: "colorBase",
      etiqueta: "Color de la prenda o tela",
      tipo: "texto",
      obligatorio: false,
      ejemplo: "Ej: negro, blanco, crudo",
    },
    {
      idCampo: "ubicacionEstampa",
      etiqueta: "Ubicación del diseño",
      tipo: "seleccion",
      opciones: ["Frente", "Espalda", "Frente y espalda", "Otra (detallar)"],
      obligatorio: false,
    },
    coloresPreferidos,
  ],

  // Cajas y packaging
  packaging: [
    descripcionPedido,
    {
      idCampo: "usoCaja",
      etiqueta: "¿Para qué es?",
      etiquetaCorta: "Uso",
      tipo: "seleccion",
      opciones: ["Emprendimiento", "Desayuno o regalo", "Pastelería", "Cosmética", "Bijouterie", "Indumentaria", "Delivery", "Otro"],
      obligatorio: false,
    },
    {
      idCampo: "medidas",
      etiqueta: "Medidas aproximadas",
      tipo: "texto",
      obligatorio: false,
      ejemplo: "Ej: 20 x 20 x 8 cm, o qué tiene que entrar",
    },
    textoIncluido,
    coloresPreferidos,
  ],

  // Papelería e impresos
  papeleria: [
    descripcionPedido,
    {
      idCampo: "formato",
      etiqueta: "Tamaño o formato",
      tipo: "texto",
      obligatorio: false,
      ejemplo: "Ej: A5, 9 x 5 cm, circular de 5 cm",
    },
    textoIncluido,
    coloresPreferidos,
  ],

  // Productos para eventos
  eventos: [
    descripcionPedido,
    {
      idCampo: "tipoEvento",
      etiqueta: "Tipo de evento",
      tipo: "seleccion",
      opciones: ["Cumpleaños", "Casamiento", "Bautismo", "Baby shower", "Recibida", "Evento de empresa", "Otro"],
      obligatorio: false,
    },
    {
      idCampo: "fechaEvento",
      etiqueta: "Fecha del evento",
      tipo: "fecha",
      obligatorio: false,
    },
    textoIncluido,
    coloresPreferidos,
  ],

  // Cartelería, vinilos, banners y stands
  granFormato: [
    descripcionPedido,
    {
      idCampo: "medidas",
      etiqueta: "Medidas aproximadas",
      tipo: "texto",
      obligatorio: false,
      ejemplo: "Ej: 2 x 1 m",
    },
    {
      idCampo: "lugar",
      etiqueta: "¿Dónde se va a usar?",
      etiquetaCorta: "Lugar de uso",
      tipo: "texto",
      obligatorio: false,
      ejemplo: "Ej: vidriera, pared interior, feria, al aire libre",
    },
    textoIncluido,
  ],

  // Regalos y fechas especiales
  regalos: [
    descripcionPedido,
    {
      idCampo: "paraQuien",
      etiqueta: "¿Para quién es?",
      etiquetaCorta: "Para",
      tipo: "texto",
      obligatorio: false,
      ejemplo: "Ej: mi mamá, mi equipo de trabajo, la seño de sala de 4",
    },
    {
      idCampo: "fechaEntrega",
      etiqueta: "¿Para cuándo lo necesitás?",
      etiquetaCorta: "Fecha de entrega",
      tipo: "fecha",
      obligatorio: false,
    },
    textoIncluido,
    coloresPreferidos,
  ],

  // Servicios de diseño (logos, identidad, flyers, redes, etc.)
  diseno: [
    {
      idCampo: "proyecto",
      etiqueta: "Nombre de tu proyecto o marca",
      tipo: "texto",
      obligatorio: false,
    },
    {
      idCampo: "rubro",
      etiqueta: "Rubro o actividad",
      tipo: "texto",
      obligatorio: false,
      ejemplo: "Ej: pastelería, estudio jurídico, tienda de ropa",
    },
    {
      ...descripcionPedido,
      etiqueta: "¿Qué necesitás?",
      etiquetaCorta: "Descripción",
      ejemplo: "Contanos qué querés lograr y qué piezas necesitás.",
    },
    {
      idCampo: "plazo",
      etiqueta: "¿Para cuándo lo necesitás?",
      etiquetaCorta: "Plazo",
      tipo: "texto",
      obligatorio: false,
      ejemplo: "Ej: para fin de mes, sin apuro",
    },
  ],
};

// Aviso que se muestra cuando el producto acepta imágenes de referencia.
// (WhatsApp no permite adjuntar archivos automáticamente desde un link,
//  por eso se le pide al cliente que los mande en el chat.)
export const avisoArchivosReferencia =
  "¿Tenés un logo, foto o imagen de referencia? Vas a poder enviarla en el chat de WhatsApp después de mandar el pedido.";
