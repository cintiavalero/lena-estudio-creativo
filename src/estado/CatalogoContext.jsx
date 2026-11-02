/* =====================================================================
   ESTADO DEL CATÁLOGO
   ⚙️  ARCHIVO TÉCNICO.
   Pone el catálogo (productos, categorías, servicios y empresas) a
   disposición de todas las páginas. Los datos salen del repositorio
   (repositorioCatalogo.js), nunca directamente de los componentes.
   ===================================================================== */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { cargarCatalogo, obtenerCatalogoLocal } from "../logica/repositorioCatalogo.js";

const CatalogoContext = createContext(null);

export function CatalogoProvider({ children }) {
  // Se arranca con los datos locales para que el sitio se vea al instante.
  const [catalogo, setCatalogo] = useState(obtenerCatalogoLocal);

  useEffect(() => {
    let activo = true;
    cargarCatalogo()
      .then((datos) => {
        if (activo && datos) setCatalogo(datos);
      })
      .catch(() => {
        // Si una futura API falla, se mantienen los datos locales.
      });
    return () => {
      activo = false;
    };
  }, []);

  const valor = useMemo(() => {
    const productosPorId = new Map(catalogo.productos.map((producto) => [producto.id, producto]));
    const serviciosPorId = new Map(catalogo.servicios.map((servicio) => [servicio.id, servicio]));
    const productosVisibles = catalogo.productos.filter((producto) => producto.visible);

    // Solo se muestran categorías con al menos un producto visible.
    const categoriasVisibles = catalogo.categorias.filter(
      (categoria) => categoria.visible && productosVisibles.some((producto) => producto.categorias.includes(categoria.id))
    );

    return {
      productosVisibles,
      productosDestacados: productosVisibles.filter((producto) => producto.destacado),
      categorias: catalogo.categorias,
      categoriasVisibles,
      serviciosVisibles: catalogo.servicios.filter((servicio) => servicio.visible),
      empresasVisibles: catalogo.empresas.filter((empresa) => empresa.visible),
      obtenerProducto: (id) => productosPorId.get(id) || null,
      obtenerServicio: (id) => serviciosPorId.get(id) || null,
      obtenerCategoria: (id) => catalogo.categorias.find((categoria) => categoria.id === id) || null,
      obtenerEmpresa: (id) => catalogo.empresas.find((empresa) => empresa.id === id) || null,
    };
  }, [catalogo]);

  return <CatalogoContext.Provider value={valor}>{children}</CatalogoContext.Provider>;
}

export function useCatalogo() {
  const contexto = useContext(CatalogoContext);
  if (!contexto) throw new Error("useCatalogo debe usarse dentro de CatalogoProvider");
  return contexto;
}

/** Busca un producto o servicio por tipo e id (lo usa el carrito). */
export function useBuscarItem() {
  const { obtenerProducto, obtenerServicio } = useCatalogo();
  return useCallback(
    (tipoItem, idItem) => (tipoItem === "servicio" ? obtenerServicio(idItem) : obtenerProducto(idItem)),
    [obtenerProducto, obtenerServicio]
  );
}
