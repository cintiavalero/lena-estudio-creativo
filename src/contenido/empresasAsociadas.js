/* =====================================================================
   OTROS SERVICIOS · EMPRESAS ASOCIADAS
   ---------------------------------------------------------------------
   ✏️  ARCHIVO EDITABLE.
   Servicios que prestan empresas asociadas a LENA (no los presta LENA
   directamente). Se muestran en "Otros servicios", separados del
   catálogo.

   Cada empresa tiene:
   - idEmpresa: nombre interno único, con guiones y sin tildes. Es su
     dirección web: /otros-servicios/valero-it
   - nombre, categoria, descripcion: textos visibles.
   - estado: "proximamente" → muestra la etiqueta "Próximamente".
             "activo"       → oculta esa etiqueta.
   - sitioWeb: dirección del sitio oficial. Mientras esté vacía "",
     no se muestra ningún botón de sitio web.
   - instagram: dirección de Instagram de la empresa (opcional).
   - logo: imagen del logo de la empresa (opcional, en
     public/imagenes/asociadas/). Si está vacío se usan sus iniciales.
   - colorAcento: "naranja" o "lavanda" (detalle de color de su tarjeta).
   - mostrarEmpresa: true = visible / false = oculta.
   - orden: número para ordenar.

   ── EJEMPLO: agregar una empresa asociada ────────────────────────────
     {
       idEmpresa: "imprenta-amiga",
       nombre: "Imprenta Amiga",
       categoria: "Impresión offset",
       descripcion: "Grandes tiradas de impresos con terminaciones especiales.",
       estado: "proximamente",
       sitioWeb: "",
       instagram: "",
       logo: "",
       colorAcento: "lavanda",
       mostrarEmpresa: true,
       orden: 40,
     },
   ===================================================================== */

const empresasAsociadas = [
  {
    idEmpresa: "valero-it",
    nombre: "Valero IT",
    categoria: "Tecnología & Desarrollo de Software",
    descripcion:
      "Soluciones tecnológicas, desarrollo de sistemas personalizados, aplicaciones y herramientas digitales a medida.",
    estado: "proximamente",
    sitioWeb: "",
    instagram: "",
    logo: "",
    colorAcento: "lavanda",
    mostrarEmpresa: true,
    orden: 10,
  },
  {
    idEmpresa: "push",
    nombre: "Push",
    categoria: "Marketing Digital & Redes Sociales",
    descripcion:
      "Publicidad, comunicación digital, gestión de redes sociales y estrategias de contenido para marcas.",
    estado: "proximamente",
    sitioWeb: "",
    instagram: "https://www.instagram.com/pushagenciacc/",
    logo: "",
    colorAcento: "naranja",
    mostrarEmpresa: true,
    orden: 20,
  },
  {
    idEmpresa: "rompehielo",
    nombre: "RompeHielo",
    categoria: "Organización & Producción de Eventos",
    descripcion: "Organización, planificación y producción de eventos y experiencias.",
    estado: "proximamente",
    sitioWeb: "",
    instagram: "",
    logo: "",
    colorAcento: "lavanda",
    mostrarEmpresa: true,
    orden: 30,
  },
];

export default empresasAsociadas;
