/* =====================================================================
   SERVICIOS CREATIVOS DE LENA
   ---------------------------------------------------------------------
   ✏️  ARCHIVO EDITABLE.
   Son las prestaciones de diseño que hace LENA (no productos físicos).
   Los servicios de empresas asociadas van en empresasAsociadas.js.

   Cada servicio tiene:
   - idServicio: nombre interno único, con guiones y sin tildes.
     También es su dirección web (/servicios/branding-identidad).
   - nombre / descripcion: textos visibles.
   - incluye: lista de lo que abarca el servicio.
   - imagen / textoAlternativo: foto (carpeta public/imagenes/servicios/).
   - disponibilidad: "disponible" → se puede pedir presupuesto.
                     "consultar"  → se muestra "Consultá disponibilidad".
   - permiteSolicitarPresupuesto: true para que se pueda sumar al pedido
     (siempre queda "a cotizar", los servicios no tienen precio fijo).
   - formularioPersonalizacion: preguntas al pedir presupuesto
     (ver personalizaciones.js). Normalmente "diseno".
   - nota: texto aclaratorio opcional.
   - enlaceNota: página interna a la que lleva la nota (opcional).
   - mostrarServicio: true = visible / false = oculto.
   - destacadoEnInicio: true = aparece en la sección de servicios del inicio.
   - orden: número para ordenar.

   ── EJEMPLO: agregar un servicio ─────────────────────────────────────
     {
       idServicio: "ilustracion",
       nombre: "Ilustración",
       descripcion: "Ilustraciones a medida para marcas, productos y regalos.",
       incluye: ["Ilustración digital", "Personajes de marca", "Retratos"],
       imagen: "/imagenes/servicios/ilustracion-vectorial.jpg",
       textoAlternativo: "Ilustración vectorial de flores celestes",
       disponibilidad: "disponible",
       permiteSolicitarPresupuesto: true,
       formularioPersonalizacion: "diseno",
       nota: "",
       enlaceNota: "",
       mostrarServicio: true,
       destacadoEnInicio: false,
       orden: 70,
     },
   ===================================================================== */

const servicios = [
  {
    idServicio: "branding-identidad",
    nombre: "Branding & Identidad Visual",
    descripcion:
      "Creamos la cara de tu marca: un logo con criterio y un sistema visual que se reconoce en cada pieza.",
    incluye: [
      "Diseño de logos",
      "Identidad visual",
      "Naming",
      "Manual de marca",
      "Rediseño de marcas",
      "Sistemas gráficos de marca",
      "Aplicaciones de identidad visual",
    ],
    imagen: "/imagenes/servicios/branding-identidad.jpg",
    textoAlternativo: "Papelería, sobres y dispositivos con una misma identidad visual en naranja y blanco",
    disponibilidad: "disponible",
    permiteSolicitarPresupuesto: true,
    formularioPersonalizacion: "diseno",
    nota: "",
    enlaceNota: "",
    mostrarServicio: true,
    destacadoEnInicio: true,
    orden: 10,
  },
  {
    idServicio: "diseno-grafico-editorial",
    nombre: "Diseño Gráfico & Editorial",
    descripcion:
      "Piezas impresas y digitales con buena jerarquía, listas para imprimir o publicar.",
    incluye: [
      "Flyers",
      "Folletos y brochures",
      "Catálogos",
      "Revistas",
      "Presentaciones",
      "Diseño editorial",
      "Papelería comercial",
      "Menús",
      "Invitaciones",
      "Etiquetas",
      "Packaging",
      "Ilustración vectorial",
      "Preparación de archivos para impresión",
    ],
    imagen: "/imagenes/productos/bolsa-kraft.jpg",
    textoAlternativo: "Bolsa kraft con un mensaje impreso para una tienda",
    disponibilidad: "disponible",
    permiteSolicitarPresupuesto: true,
    formularioPersonalizacion: "diseno",
    nota: "",
    enlaceNota: "",
    mostrarServicio: true,
    destacadoEnInicio: true,
    orden: 20,
  },
  {
    idServicio: "diseno-medios-digitales",
    nombre: "Diseño para Medios Digitales",
    descripcion:
      "Contenido visual coherente para redes, mails y campañas, con plantillas que podés seguir usando.",
    incluye: [
      "Piezas para redes sociales",
      "Plantillas editables",
      "Publicaciones e historias",
      "Portadas para reels",
      "Banners digitales",
      "Newsletters",
      "Firmas de correo",
      "Presentaciones digitales",
      "Material visual para campañas",
    ],
    imagen: "/imagenes/servicios/redes-sociales.jpg",
    textoAlternativo: "Placas para feed e historias de Instagram vistas en dos celulares",
    disponibilidad: "disponible",
    permiteSolicitarPresupuesto: true,
    formularioPersonalizacion: "diseno",
    nota: "¿Buscás quien gestione tus redes y campañas? Lo hacemos junto a Push.",
    enlaceNota: "/otros-servicios/push",
    mostrarServicio: true,
    destacadoEnInicio: true,
    orden: 30,
  },
  {
    idServicio: "diseno-eventos-experiencias",
    nombre: "Diseño para Eventos & Experiencias",
    descripcion:
      "La identidad gráfica de tu evento, desde la invitación hasta el cartel de la entrada.",
    incluye: [
      "Identidad gráfica de eventos",
      "Diseño de stands",
      "Cartelería",
      "Señalética",
      "Material promocional",
      "Credenciales",
      "Piezas para celebraciones y eventos corporativos",
    ],
    imagen: "/imagenes/productos/fiesta-celebracion.jpg",
    textoAlternativo: "Grupo de amigos celebrando con papel picado",
    disponibilidad: "disponible",
    permiteSolicitarPresupuesto: true,
    formularioPersonalizacion: "diseno",
    nota: "Para organizar y producir el evento completo, trabajamos con RompeHielo.",
    enlaceNota: "/otros-servicios/rompehielo",
    mostrarServicio: true,
    destacadoEnInicio: false,
    orden: 40,
  },
  {
    idServicio: "contenido-visual-audiovisual",
    nombre: "Producción Audiovisual & Contenido Visual",
    descripcion:
      "Edición de foto y video, animaciones y piezas en movimiento para que tu marca también se mueva.",
    incluye: [
      "Edición de video",
      "Edición fotográfica",
      "Piezas audiovisuales promocionales",
      "Contenido visual para marcas",
      "Animaciones gráficas",
      "Motion graphics",
      "Adaptación de piezas a formatos digitales",
    ],
    imagen: "/imagenes/servicios/contenido-visual.jpg",
    textoAlternativo: "Mesa de trabajo con cámara de fotos, tablet y notebook",
    disponibilidad: "consultar",
    permiteSolicitarPresupuesto: true,
    formularioPersonalizacion: "diseno",
    nota: "",
    enlaceNota: "",
    mostrarServicio: true,
    destacadoEnInicio: false,
    orden: 50,
  },
  {
    idServicio: "diseno-web",
    nombre: "Diseño Web",
    descripcion:
      "Diseño visual de sitios y aplicaciones: interfaces claras, prototipos navegables y piezas digitales.",
    incluye: [
      "Diseño visual de interfaces",
      "Prototipos",
      "Diseño de landing pages",
      "Piezas digitales para sitios",
    ],
    imagen: "/imagenes/servicios/diseno-web.jpg",
    textoAlternativo: "Sitio web visto en computadora, notebook, tablet y celular",
    disponibilidad: "disponible",
    permiteSolicitarPresupuesto: true,
    formularioPersonalizacion: "diseno",
    nota: "El desarrollo de sitios y sistemas a medida lo realiza Valero IT, empresa asociada.",
    enlaceNota: "/otros-servicios/valero-it",
    mostrarServicio: true,
    destacadoEnInicio: false,
    orden: 60,
  },
];

export default servicios;
