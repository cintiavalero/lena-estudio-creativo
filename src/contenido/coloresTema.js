/* =====================================================================
   COLORES Y TIPOGRAFÍAS
   ---------------------------------------------------------------------
   ✏️  ARCHIVO EDITABLE.
   Los colores se escriben en formato hexadecimal: "#F27825".
   Podés copiarlos directamente desde Illustrator, Figma o Canva.

   Idea del diseño: la mayor parte del sitio es blanca y gris;
   el naranja y el lavanda del logo se usan solo como acentos.
   ===================================================================== */

export const coloresTema = {
  // Colores de la marca (tomados del logo de LENA)
  naranja: "#F27825", //  acento principal: botones, enlaces activos, detalles
  naranjaSuave: "#FDEEE3", //  fondos pequeños detrás de etiquetas
  naranjaOscuro: "#A64807", //  versión legible del naranja para textos chicos
  lavanda: "#8175B0", //  acento secundario: ilustraciones, etiquetas
  lavandaSuave: "#EEECF6", //  fondos de bloques destacados
  lavandaOscuro: "#5B4F8C", //  versión legible del lavanda para textos

  // Neutros (son la base del sitio)
  fondo: "#FBFAF7", //  blanco cálido, fondo general
  blanco: "#FFFFFF", //  tarjetas y paneles
  grisClaro: "#F0EEE9", //  fondos de imágenes y separaciones
  grisLinea: "#DEDBD3", //  bordes y líneas finas
  grisTexto: "#67645E", //  textos secundarios
  tinta: "#1E1D1B", //  textos principales y botones oscuros
};

export const tipografias = {
  // Tipografía de títulos
  titulos: "'Bricolage Grotesque', 'Segoe UI', sans-serif",
  // Tipografía de textos y botones
  textos: "'Figtree', 'Segoe UI', sans-serif",
  // Dirección de Google Fonts que carga las dos tipografías.
  // Si cambiás de tipografía, generá una nueva dirección en
  // https://fonts.google.com (botón "Get embed code") y pegala acá.
  direccionGoogleFonts:
    "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Figtree:ital,wght@0,400..700;1,400&display=swap",
};
