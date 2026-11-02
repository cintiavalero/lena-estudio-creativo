import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import textosSitio from "../contenido/textosSitio.js";
import { useCatalogo } from "../estado/CatalogoContext.jsx";
import { filtrarProductos } from "../logica/busqueda.js";
import { useMetadatos } from "../logica/useMetadatos.js";
import TarjetaProducto from "../componentes/catalogo/TarjetaProducto.jsx";
import Icono from "../componentes/comunes/Icono.jsx";
import { TrazoTitulo } from "../componentes/comunes/Decoraciones.jsx";

const textos = textosSitio.catalogo;
// En la vista "Todo", cuántos productos se muestran por categoría.
const PRODUCTOS_POR_GRUPO = 4;

export default function Catalogo() {
  const { productosVisibles, categoriasVisibles } = useCatalogo();
  const [parametros, setParametros] = useSearchParams();
  const busqueda = parametros.get("buscar") || "";
  const idCategoriaPedida = parametros.get("categoria") || "";
  const categoriaActiva = categoriasVisibles.find((categoria) => categoria.id === idCategoriaPedida) || null;

  useMetadatos({
    titulo: categoriaActiva ? categoriaActiva.nombre : textos.tituloPagina,
    descripcion: categoriaActiva?.descripcion || textos.bajada,
  });

  const resultados = useMemo(
    () => filtrarProductos(productosVisibles, { idCategoria: categoriaActiva?.id || "", busqueda, categorias: categoriasVisibles }),
    [productosVisibles, categoriaActiva, busqueda, categoriasVisibles]
  );

  // Sin filtro ni búsqueda, el catálogo se muestra agrupado por categoría.
  const vistaAgrupada = !categoriaActiva && !busqueda.trim();
  const grupos = useMemo(
    () =>
      categoriasVisibles
        .map((categoria) => ({
          categoria,
          // Cada producto aparece en el grupo de su categoría principal (sin repetirse).
          productos: productosVisibles.filter((producto) => producto.categorias[0] === categoria.id),
          total: productosVisibles.filter((producto) => producto.categorias.includes(categoria.id)).length,
        }))
        .filter((grupo) => grupo.productos.length > 0),
    [categoriasVisibles, productosVisibles]
  );

  const elegirCategoria = (idCategoria) => {
    actualizarParametro("categoria", idCategoria);
    document.getElementById("buscador-catalogo")?.closest(".filtros")?.scrollIntoView({ block: "start" });
  };

  const actualizarParametro = (clave, valor) => {
    const nuevos = new URLSearchParams(parametros);
    if (valor) nuevos.set(clave, valor);
    else nuevos.delete(clave);
    setParametros(nuevos, { replace: clave === "buscar" });
  };

  return (
    <div className="pagina-catalogo">
      <header className="cabecera-pagina contenedor">
        <h1 className="cabecera-pagina__titulo">
          {textos.titulo}
          <TrazoTitulo />
        </h1>
        <p className="cabecera-pagina__bajada">{textos.bajada}</p>
      </header>

      <div className="filtros contenedor">
        <div className="buscador">
          <label htmlFor="buscador-catalogo" className="solo-lectores">
            {textos.textoBuscador}
          </label>
          <Icono nombre="buscar" tamano={20} />
          <input
            id="buscador-catalogo"
            type="search"
            placeholder={textos.ejemploBuscador}
            value={busqueda}
            onChange={(evento) => actualizarParametro("buscar", evento.target.value)}
          />
        </div>
        <nav className="chips" aria-label="Categorías">
          <button
            type="button"
            className={`chip ${!categoriaActiva ? "chip--activo" : ""}`}
            aria-pressed={!categoriaActiva}
            onClick={() => actualizarParametro("categoria", "")}
          >
            {textos.textoTodas}
          </button>
          {categoriasVisibles.map((categoria) => (
            <button
              key={categoria.id}
              type="button"
              className={`chip ${categoriaActiva?.id === categoria.id ? "chip--activo" : ""}`}
              aria-pressed={categoriaActiva?.id === categoria.id}
              onClick={() => actualizarParametro("categoria", categoria.id)}
            >
              {categoria.nombre}
            </button>
          ))}
        </nav>
      </div>

      <section className="contenedor resultados" aria-live="polite" aria-label="Productos">
        <div className="resultados__info" key={`info-${categoriaActiva?.id || "todo"}`}>
          {categoriaActiva && <p className="resultados__descripcion">{categoriaActiva.descripcion}</p>}
          <p className="resultados__cantidad">
            {resultados.length} {resultados.length === 1 ? "producto" : "productos"}
          </p>
        </div>

        {vistaAgrupada ? (
          <div className="catalogo-agrupado">
            {grupos.map((grupo, indiceGrupo) => (
              <section className="grupo-catalogo" key={grupo.categoria.id} aria-labelledby={`grupo-${grupo.categoria.id}`}>
                <div className="grupo-catalogo__encabezado">
                  <div>
                    <h2 id={`grupo-${grupo.categoria.id}`} className="grupo-catalogo__titulo">{grupo.categoria.nombre}</h2>
                    <p className="grupo-catalogo__descripcion">{grupo.categoria.descripcion}</p>
                  </div>
                  <button type="button" className="enlace-flecha" onClick={() => elegirCategoria(grupo.categoria.id)}>
                    {textos.textoVerCategoria} ({grupo.total}) <Icono nombre="ir" tamano={18} />
                  </button>
                </div>
                <div className="grilla-productos grilla-productos--cuatro">
                  {grupo.productos.slice(0, PRODUCTOS_POR_GRUPO).map((producto, indice) => (
                    <TarjetaProducto key={producto.id} producto={producto} prioridad={indiceGrupo === 0 && indice < 4} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : resultados.length > 0 ? (
          <div className="grilla-productos" key={`${categoriaActiva?.id || "todo"}-${busqueda}`}>
            {resultados.map((producto, indice) => (
              <div className="grilla-productos__item" style={{ "--indice": Math.min(indice, 8) }} key={producto.id}>
                <TarjetaProducto producto={producto} prioridad={indice < 3} />
              </div>
            ))}
          </div>
        ) : (
          <div className="sin-resultados">
            <h2>{textos.sinResultadosTitulo}</h2>
            <p>{textos.sinResultadosTexto}</p>
            <button
              type="button"
              className="boton boton--secundario"
              onClick={() => setParametros(new URLSearchParams())}
            >
              {textos.botonLimpiar}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
