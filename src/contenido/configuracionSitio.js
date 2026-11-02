/* =====================================================================
   CONFIGURACIÓN GENERAL DEL SITIO
   ---------------------------------------------------------------------
   ✏️  ARCHIVO EDITABLE.
   Acá se cambian los datos básicos de LENA: nombre, eslogan, logo,
   contacto y la dirección pública del sitio.

   Reglas para editar sin romper nada:
   - Cambiá solamente lo que está entre comillas "...".
   - No borres las comas al final de cada línea.
   - Si un dato todavía no existe, dejalo vacío así: ""
     (el sitio oculta automáticamente lo que esté vacío).
   ===================================================================== */

const configuracionSitio = {
  // Nombre del emprendimiento (se usa en títulos, pie de página y mensajes).
  nombreEmprendimiento: "LENA",

  // Frase corta que acompaña al nombre.
  eslogan: "Estudio creativo",

  // Descripción general. Se usa para Google y cuando se comparte el link.
  descripcionGeneral:
    "Estudio creativo de diseño gráfico, identidad visual, papelería, merch y productos personalizados para personas, emprendimientos y empresas.",

  // Logo que aparece en el encabezado.
  // Para cambiarlo: copiá la imagen nueva en  public/imagenes/marca/
  // y escribí acá su nombre. Conviene un PNG con fondo transparente.
  logo: {
    archivo: "/imagenes/marca/logo-lena.png",
    textoAlternativo: "LENA estudio creativo",
    // Proporción original del logo (ancho / alto). No hace falta tocarla
    // salvo que cambies el logo por otro con otra forma.
    ancho: 1002,
    alto: 592,
  },

  // Dirección pública del sitio, SIN barra al final.
  // Ejemplo: "https://lena-estudio.vercel.app"
  // Mientras esté vacía, no se genera el sitemap.xml (es correcto así).
  urlPublica: "",

  // Imagen que aparece cuando se comparte el sitio por WhatsApp o redes.
  imagenParaCompartir: "/imagenes/marca/compartir-lena.jpg",

  // Datos de contacto. Lo que quede vacío no se muestra.
  contacto: {
    // WhatsApp: solo números, con código de país y de área, SIN el 15,
    // sin espacios ni signos. Ejemplo para La Plata: "5492211234567"
    // ⚠️ Es el número que recibe los pedidos del carrito.
    whatsapp: "",
    email: "",
    ciudad: "",
    // Texto opcional sobre horarios de atención. Ej: "Lunes a viernes de 9 a 18"
    horarioAtencion: "",
  },
};

export default configuracionSitio;
