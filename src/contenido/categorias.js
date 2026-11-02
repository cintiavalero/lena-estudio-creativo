/* =====================================================================
   CATEGORÍAS DEL CATÁLOGO
   ---------------------------------------------------------------------
   ✏️  ARCHIVO EDITABLE.
   Cada categoría es un bloque { ... }. Los productos se asocian a una
   categoría escribiendo su "idCategoria" en el archivo productos.js.

   - idCategoria: nombre interno, en minúsculas y con guiones, sin
     espacios ni tildes. Aparece en la dirección web
     (ej: /catalogo?categoria=papeleria-impresos). Si lo cambiás,
     cambialo también en los productos que lo usan.
   - nombre / descripcion: textos visibles.
   - ilustracion: dibujo que se muestra cuando un producto de esta
     categoría no tiene foto. Opciones: "papel", "caja", "remera",
     "bolsa", "regalo", "evento", "cartel", "negocio", "cuadro", "cuaderno",
     "estrella".
   - orden: número para ordenar (el más chico va primero).
   - mostrarCategoria: true = se muestra / false = se oculta.
     Aunque esté en true, una categoría sin productos visibles no
     aparece en los filtros (así nunca se ve una categoría vacía).
   - productosPorHabilitar: lista de ideas para el futuro. NO se
     muestra en el sitio; sirve como recordatorio interno.

   ── EJEMPLO: agregar una categoría ───────────────────────────────────
     {
       idCategoria: "mascotas",
       nombre: "Mascotas",
       descripcion: "Chapitas, bandanas y accesorios con nombre.",
       ilustracion: "estrella",
       orden: 110,
       mostrarCategoria: true,
       productosPorHabilitar: [],
     },
   ===================================================================== */

const categorias = [
  {
    idCategoria: "papeleria-impresos",
    nombre: "Papelería & Impresos",
    descripcion: "Tarjetas, stickers, agendas, blocs e impresos con tu diseño.",
    ilustracion: "papel",
    orden: 10,
    mostrarCategoria: true,
    productosPorHabilitar: [
      "Tarjetas premium", "Tarjetas de agradecimiento", "Gift cards", "Hang tags",
      "Cuadernos y libretas", "Planificadores", "Calendarios", "Señaladores",
      "Carpetas", "Menús", "Recetarios", "Diplomas", "Papelería institucional",
    ],
  },
  {
    idCategoria: "packaging-cajas",
    nombre: "Packaging & Cajas",
    descripcion: "Cajas y envoltorios que hacen que abrir un pedido sea parte de la experiencia.",
    ilustracion: "caja",
    orden: 20,
    mostrarCategoria: true,
    productosPorHabilitar: [
      "Cajas rígidas premium", "Cajas con visor", "Bolsas kraft", "Bolsas boutique",
      "Papel de seda", "Fajas y cintas", "Packaging para delivery",
    ],
  },
  {
    idCategoria: "textil-estampados",
    nombre: "Textil & Estampados",
    descripcion: "Tote bags, remeras y prendas estampadas con tu idea o tu marca.",
    ilustracion: "bolsa",
    orden: 30,
    mostrarCategoria: true,
    productosPorHabilitar: [
      "Buzos y hoodies", "Gorras y pilusos", "Delantales", "Uniformes", "Cartucheras",
      "Neceseres", "Pañuelos", "Parches textiles", "Prendas infantiles",
    ],
  },
  {
    idCategoria: "merch-regalos",
    nombre: "Merch & Regalos",
    descripcion: "Objetos con tu identidad para regalar, vender o sumar a un kit.",
    ilustracion: "regalo",
    orden: 40,
    mostrarCategoria: true,
    productosPorHabilitar: [
      "Llaveros", "Pines y chapitas", "Imanes", "Tazas y vasos", "Botellas y termos",
      "Mates", "Lapiceras", "Mousepads", "Kits corporativos", "Kits de bienvenida",
      "Kits para influencers", "Kits para emprendedores",
    ],
  },
  {
    idCategoria: "eventos-celebraciones",
    nombre: "Eventos & Celebraciones",
    descripcion: "Invitaciones, pulseras, Polaroids y detalles para cumpleaños, casamientos y eventos de empresa.",
    ilustracion: "evento",
    orden: 50,
    mostrarCategoria: true,
    productosPorHabilitar: [
      "Credenciales y lanyards", "Banderines y guirnaldas", "Souvenirs", "Photobooth",
      "Backdrops", "Toppers", "Decoración para cumpleaños", "Decoración para casamientos",
      "Baby showers y bautismos",
    ],
  },
  {
    idCategoria: "carteleria-gran-formato",
    nombre: "Cartelería & Gran Formato",
    descripcion: "Banners, carteles, vinilos y stands para que tu marca se vea de lejos.",
    ilustracion: "cartel",
    orden: 60,
    mostrarCategoria: true,
    productosPorHabilitar: [
      "Roller banners", "Ploteos", "Lonas", "Gigantografías", "Señalética",
      "Displays y exhibidores", "Paneles publicitarios", "Materiales para ferias",
    ],
  },
  {
    idCategoria: "emprendedores-negocios",
    nombre: "Emprendedores & Negocios",
    descripcion: "Todo lo que un emprendimiento necesita para presentarse, vender y entregar.",
    ilustracion: "negocio",
    orden: 70,
    mostrarCategoria: true,
    productosPorHabilitar: [
      "Tarjetas de fidelización", "Etiquetas de productos", "Códigos QR impresos",
      "Listas de precios", "Cartas gastronómicas", "Kits de marca",
    ],
  },
  {
    idCategoria: "decoracion-personalizados",
    nombre: "Decoración & Personalizados",
    descripcion: "Piezas para el hogar con tus fotos, tus frases o tu estilo.",
    ilustracion: "cuadro",
    orden: 80,
    mostrarCategoria: true,
    productosPorHabilitar: [
      "Cuadros", "Láminas y pósters", "Collages", "Portarretratos", "Almohadones",
      "Carteles decorativos",
    ],
  },
  {
    idCategoria: "oficina-educacion",
    nombre: "Oficina & Educación",
    descripcion: "Agendas, anotadores y material para organizar el trabajo y el aula.",
    ilustracion: "cuaderno",
    orden: 90,
    mostrarCategoria: true,
    productosPorHabilitar: [
      "Etiquetas escolares", "Material didáctico", "Flashcards", "Kits para docentes",
      "Organizadores de escritorio",
    ],
  },
  {
    idCategoria: "temporadas-fechas-especiales",
    nombre: "Temporadas & Fechas Especiales",
    descripcion: "Kits y regalos para Navidad, Día de la Madre, egresados y otras fechas.",
    ilustracion: "estrella",
    orden: 100,
    mostrarCategoria: true,
    productosPorHabilitar: [
      "Navidad", "San Valentín", "Día de la Madre", "Día del Padre", "Día de la Niñez",
      "Día del Maestro", "Pascuas", "Egresados", "Aniversarios",
    ],
  },
];

export default categorias;
