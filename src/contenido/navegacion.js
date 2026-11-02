/* =====================================================================
   MENÚ DE NAVEGACIÓN
   ---------------------------------------------------------------------
   ✏️  ARCHIVO EDITABLE (con cuidado).
   - "texto" es lo que se lee en el menú: se puede cambiar libremente.
   - "ruta" es la dirección interna de la página: NO la cambies salvo
     que sepas que esa página existe. Las rutas disponibles son:
       "/"  "/catalogo"  "/servicios"  "/otros-servicios"  "/contacto"
   - Para quitar un ítem del menú, borrá su línea completa.
   ===================================================================== */

export const menuPrincipal = [
  { texto: "Catálogo", ruta: "/catalogo" },
  { texto: "Servicios creativos", ruta: "/servicios" },
  { texto: "Otros servicios", ruta: "/otros-servicios" },
  { texto: "Contacto", ruta: "/contacto" },
];

// Enlaces del pie de página
export const menuPiePagina = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Catálogo", ruta: "/catalogo" },
  { texto: "Servicios creativos", ruta: "/servicios" },
  { texto: "Otros servicios", ruta: "/otros-servicios" },
  { texto: "Contacto", ruta: "/contacto" },
  { texto: "Mi pedido", ruta: "/carrito" },
];
