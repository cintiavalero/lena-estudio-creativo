/* =====================================================================
   FEED "DESCUBRÍ" · primera pantalla del inicio
   Mosaico de productos en orden aleatorio, con accesos a categorías y
   servicios intercalados. Se cargan de a tandas al llegar al final.
   Se configura en src/contenido/configuracionInicio.js
   ===================================================================== */

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigationType } from "react-router-dom";
import textosSitio from "../../contenido/textosSitio.js";
import configuracionInicio from "../../contenido/configuracionInicio.js";
import { useCatalogo } from "../../estado/CatalogoContext.jsx";
import {
  armarFeed,
  repartirEnColumnas,
  obtenerSemillaDeVisita,
  guardarSemilla,
  nuevaSemilla,
  guardarPosicionFeed,
  leerPosicionFeed,
  debeRetomarPosicion,
  obtenerPortadasAlternativas,
  guardarPortadasAlternativas,
} from "../../logica/feed.js";
import { formatearPrecio } from "../../logica/precios.js";
import GaleriaDeslizable from "../comunes/GaleriaDeslizable.jsx";
import ImagenProducto from "../comunes/ImagenProducto.jsx";
import IlustracionRespaldo from "../comunes/IlustracionRespaldo.jsx";
import Icono from "../comunes/Icono.jsx";

const textos = textosSitio.inicio;

/** Cantidad de columnas según el ancho de la pantalla. */
function useCantidadColumnas() {
  const calcular = () => {
    if (typeof window === "undefined") return 2;
    const ancho = window.innerWidth;
    if (ancho < 640) return 2;
    if (ancho < 1000) return 3;
    return 4;
  };
  const [columnas, setColumnas] = useState(calcular);
  useEffect(() => {
    const alCambiar = () => setColumnas(calcular());
    window.addEventListener("resize", alCambiar);
    return () => window.removeEventListener("resize", alCambiar);
  }, []);
  return columnas;
}

function MosaicoProducto({ elemento }) {
  const { obtenerIlustracion, obtenerCategoria } = useCatalogo();
  const { producto, fotos, formato } = elemento;
  const categoria = obtenerCategoria(producto.categorias[0]);
  const precio = producto.permiteCompraEstandar && producto.tipoPrecio === "fijo" ? formatearPrecio(producto.precio) : "";
  return (
    <article className="mosaico mosaico--producto">
      <GaleriaDeslizable
        fotos={fotos.length ? fotos : [""]}
        textoAlternativo={producto.textoAlternativo}
        ilustracion={obtenerIlustracion(producto)}
        enlace={producto.ruta}
        proporcion={formato.proporcion}
        nombre={producto.nombre}
      />
      <div className="mosaico__texto">
        <Link to={producto.ruta} className="mosaico__nombre">
          {producto.nombre}
        </Link>
        <p className="mosaico__meta">
          {precio && <strong>{precio}</strong>}
          {categoria && <Link to={`/catalogo?categoria=${categoria.id}`}>{categoria.nombre}</Link>}
        </p>
      </div>
    </article>
  );
}

function MosaicoCategoria({ elemento }) {
  const { categoria, imagen, cantidad, formato } = elemento;
  return (
    <Link to={`/catalogo?categoria=${categoria.id}`} className="mosaico mosaico--acceso" style={{ aspectRatio: formato.proporcion }}>
      {imagen ? (
        <ImagenProducto src={imagen} alt="" ilustracion={categoria.ilustracion} />
      ) : (
        <span className="mosaico__dibujo">
          <IlustracionRespaldo tipo={categoria.ilustracion} />
        </span>
      )}
      <span className="mosaico__rotulo">
        <strong>{categoria.nombre}</strong>
        <small>
          {textos.feedVerCategoria} ({cantidad}) <Icono nombre="ir" tamano={14} />
        </small>
      </span>
    </Link>
  );
}

function MosaicoServicio({ elemento }) {
  const { servicio, formato } = elemento;
  return (
    <Link to={servicio.ruta} className="mosaico mosaico--acceso mosaico--servicio" style={{ aspectRatio: formato.proporcion }}>
      <ImagenProducto src={servicio.imagenPrincipal} alt="" ilustracion="estrella" />
      <span className="mosaico__rotulo">
        <small>{textos.feedEtiquetaServicio}</small>
        <strong>{servicio.nombre}</strong>
      </span>
    </Link>
  );
}

export default function FeedDescubrir({ tituloPrincipal = true }) {
  const { productosVisibles, categoriasVisibles, serviciosVisibles } = useCatalogo();
  const tipoNavegacion = useNavigationType();
  const porTanda = Math.max(4, Math.floor(configuracionInicio.productosPorTanda || 12));
  const posicionGuardada = useRef(undefined);
  if (posicionGuardada.current === undefined) {
    posicionGuardada.current = debeRetomarPosicion(tipoNavegacion) ? leerPosicionFeed() : null;
  }

  const [semilla, setSemilla] = useState(obtenerSemillaDeVisita);
  const [portadasAlternativas, setPortadasAlternativas] = useState(obtenerPortadasAlternativas);
  const [cantidadVisible, setCantidadVisible] = useState(() => posicionGuardada.current?.cantidadVisible || porTanda);
  const columnas = useCantidadColumnas();
  const sensor = useRef(null);
  const inicioFeed = useRef(null);

  const elementos = useMemo(
    () =>
      armarFeed({
        productos: productosVisibles,
        categorias: categoriasVisibles,
        servicios: serviciosVisibles,
        semilla,
        configuracion: configuracionInicio,
        portadasAlternativas,
      }),
    [productosVisibles, categoriasVisibles, serviciosVisibles, semilla, portadasAlternativas]
  );
  const visibles = useMemo(() => elementos.slice(0, cantidadVisible), [elementos, cantidadVisible]);
  const repartidos = useMemo(() => repartirEnColumnas(visibles, columnas), [visibles, columnas]);
  const terminado = cantidadVisible >= elementos.length;

  // Al volver atrás desde un producto, retoma donde estaba.
  useLayoutEffect(() => {
    const posicion = posicionGuardada.current;
    if (posicion) window.scrollTo({ top: posicion.scrollY, behavior: "instant" });
  }, []);

  // Guarda la posición mientras se scrollea (para poder volver al mismo lugar).
  const cantidadRef = useRef(cantidadVisible);
  cantidadRef.current = cantidadVisible;
  useEffect(() => {
    let pendiente = false;
    let activo = true;
    const guardar = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        pendiente = false;
        if (activo) guardarPosicionFeed({ cantidadVisible: cantidadRef.current, scrollY: window.scrollY });
      });
    };
    guardar();
    window.addEventListener("scroll", guardar, { passive: true });
    return () => {
      activo = false;
      window.removeEventListener("scroll", guardar);
    };
  }, []);
  useEffect(() => {
    guardarPosicionFeed({ cantidadVisible, scrollY: window.scrollY });
  }, [cantidadVisible]);

  // Carga la siguiente tanda al acercarse al final.
  const cargarMas = useCallback(() => setCantidadVisible((actual) => actual + porTanda), [porTanda]);
  useEffect(() => {
    const elemento = sensor.current;
    if (!elemento || terminado || typeof IntersectionObserver === "undefined") return undefined;
    const observador = new IntersectionObserver((entradas) => entradas[0].isIntersecting && cargarMas(), {
      rootMargin: "900px 0px",
    });
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [cargarMas, terminado, cantidadVisible]);

  const mezclarDeNuevo = () => {
    const semillaNueva = nuevaSemilla();
    guardarSemilla(semillaNueva);
    setSemilla(semillaNueva);
    // Al mezclar, los productos con varias fotos muestran otra como portada.
    if (configuracionInicio.alMezclarMostrarFotoAdicional) {
      guardarPortadasAlternativas(true);
      setPortadasAlternativas(true);
    }
    setCantidadVisible(porTanda);
    inicioFeed.current?.scrollIntoView({ block: "start" });
  };

  if (elementos.length === 0) return null;

  return (
    <section className="feed contenedor" aria-labelledby="titulo-feed" ref={inicioFeed}>
      <div className="feed__encabezado">
        <div>
          {tituloPrincipal ? (
            <h1 id="titulo-feed" className="feed__titulo">{textos.heroTitulo}</h1>
          ) : (
            <h2 id="titulo-feed" className="feed__titulo">{textos.destacadosTitulo}</h2>
          )}
          {tituloPrincipal && textos.heroBajada && <p className="feed__bajada">{textos.heroBajada}</p>}
        </div>
        <button type="button" className="boton-mezclar" onClick={mezclarDeNuevo}>
          <Icono nombre="mezclar" tamano={18} /> {textos.feedBotonMezclar}
        </button>
      </div>

      <nav className="feed__categorias chips" aria-label="Categorías">
        {categoriasVisibles.map((categoria) => (
          <Link key={categoria.id} to={`/catalogo?categoria=${categoria.id}`} className="chip">
            {categoria.nombre}
          </Link>
        ))}
      </nav>

      <div className="feed__mosaico" style={{ "--columnas": columnas }} key={semilla}>
        {repartidos.map((columna, indiceColumna) => (
          <div className="feed__columna" key={indiceColumna}>
            {columna.map((elemento) =>
              elemento.tipo === "producto" ? (
                <MosaicoProducto key={elemento.clave} elemento={elemento} />
              ) : elemento.tipo === "categoria" ? (
                <MosaicoCategoria key={elemento.clave} elemento={elemento} />
              ) : (
                <MosaicoServicio key={elemento.clave} elemento={elemento} />
              )
            )}
          </div>
        ))}
      </div>

      {!terminado ? (
        <div ref={sensor} className="feed__sensor">
          <button type="button" className="boton boton--secundario" onClick={cargarMas}>
            Ver más
          </button>
        </div>
      ) : (
        <div className="feed__fin">
          <p>{textos.feedFinTitulo}</p>
          <div>
            <button type="button" className="boton boton--principal" onClick={mezclarDeNuevo}>
              <Icono nombre="mezclar" tamano={18} /> {textos.feedFinBoton}
            </button>
            <Link to="/catalogo" className="boton boton--secundario">
              {textos.feedFinEnlace}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
