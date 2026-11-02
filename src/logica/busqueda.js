/* =====================================================================
   BUSCADOR Y FILTROS DEL CATÁLOGO
   ⚙️  ARCHIVO TÉCNICO.
   ===================================================================== */

/** Pasa a minúsculas y quita tildes: "Papelería" → "papeleria". */
export function normalizarTexto(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

/**
 * Filtra productos por categoría y texto.
 * Busca en nombre, descripciones, etiquetas y nombres de categorías.
 */
export function filtrarProductos(productos, { idCategoria = "", busqueda = "", categorias = [] } = {}) {
  const palabras = normalizarTexto(busqueda).split(/\s+/).filter(Boolean);
  const nombresCategorias = new Map(categorias.map((categoria) => [categoria.id, categoria.nombre]));

  return productos.filter((producto) => {
    if (idCategoria && !producto.categorias.includes(idCategoria)) return false;
    if (palabras.length === 0) return true;
    const textoProducto = normalizarTexto(
      [
        producto.nombre,
        producto.descripcionCorta,
        producto.descripcionExtendida,
        ...producto.etiquetas,
        ...producto.categorias.map((id) => nombresCategorias.get(id) || ""),
      ].join(" ")
    );
    return palabras.every((palabra) => textoProducto.includes(palabra));
  });
}
