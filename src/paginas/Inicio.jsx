import { Link } from "react-router-dom";
import textosSitio from "../contenido/textosSitio.js";
import { useCatalogo } from "../estado/CatalogoContext.jsx";
import { useMetadatos } from "../logica/useMetadatos.js";
import TarjetaProducto from "../componentes/catalogo/TarjetaProducto.jsx";
import MarcasCorte from "../componentes/comunes/MarcasCorte.jsx";
import Revelar from "../componentes/comunes/Revelar.jsx";
import Icono from "../componentes/comunes/Icono.jsx";
import EnlacesContacto from "../componentes/comunes/EnlacesContacto.jsx";
import { MarcaRegistro } from "../componentes/comunes/Decoraciones.jsx";
import IlustracionRespaldo from "../componentes/comunes/IlustracionRespaldo.jsx";

const textos = textosSitio.inicio;
const CANTIDAD_DESTACADOS = 6;

function Hero() {
  const imagenes = textos.heroImagenes.filter((imagen) => imagen && imagen.archivo).slice(0, 3);
  return (
    <section className="hero contenedor" aria-labelledby="titulo-hero">
      <div className="hero__texto">
        <h1 id="titulo-hero" className="hero__titulo">{textos.heroTitulo}</h1>
        <p className="hero__bajada">{textos.heroBajada}</p>
        <div className="hero__botones">
          <Link to="/catalogo" className="boton boton--principal">
            {textos.heroBotonCatalogo}
          </Link>
          <Link to="/contacto" className="boton boton--secundario">
            {textos.heroBotonPresupuesto}
          </Link>
        </div>
      </div>

      {imagenes.length > 0 && (
        <div className="hero__pliego">
          <div className={`pliego pliego--${imagenes.length}`}>
            {imagenes.map((imagen, indice) => (
              <figure key={imagen.archivo} className={`pliego__pieza pliego__pieza--${indice + 1}`}>
                <img src={imagen.archivo} alt={imagen.textoAlternativo || ""} fetchPriority={indice === 0 ? "high" : undefined} />
              </figure>
            ))}
            <div className="pliego__control" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
            <MarcaRegistro className="pliego__registro pliego__registro--izquierda" />
            <MarcaRegistro className="pliego__registro pliego__registro--derecha" />
            <MarcasCorte className="marcas-corte--fijas marcas-corte--hero" />
          </div>
        </div>
      )}
    </section>
  );
}

function Destacados() {
  const { productosDestacados, productosVisibles } = useCatalogo();
  // Si no hay destacados marcados, se muestran los primeros del catálogo.
  const lista = (productosDestacados.length ? productosDestacados : productosVisibles).slice(0, CANTIDAD_DESTACADOS);
  if (lista.length === 0) return null;
  return (
    <section className="seccion contenedor" aria-labelledby="titulo-destacados">
      <div className="seccion__encabezado">
        <div>
          <h2 id="titulo-destacados" className="seccion__titulo">{textos.destacadosTitulo}</h2>
          <p className="seccion__bajada">{textos.destacadosBajada}</p>
        </div>
        <Link to="/catalogo" className="enlace-flecha">
          {textos.destacadosEnlace} <Icono nombre="ir" tamano={18} />
        </Link>
      </div>
      <div className="grilla-destacados">
        {lista.map((producto, indice) => (
          <Revelar key={producto.id} retraso={Math.min(indice, 5) * 70} className={indice === 0 ? "grilla-destacados__grande" : ""}>
            <TarjetaProducto producto={producto} grande={indice === 0} />
          </Revelar>
        ))}
      </div>
    </section>
  );
}

function FechasEspeciales() {
  const { productosVisibles, obtenerIlustracion } = useCatalogo();
  const fechas = productosVisibles.filter((producto) => producto.categorias.includes(textos.fechasCategoria));
  if (fechas.length === 0) return null;
  return (
    <section className="seccion contenedor" aria-labelledby="titulo-fechas">
      <div className="seccion__encabezado">
        <div>
          <h2 id="titulo-fechas" className="seccion__titulo">{textos.fechasTitulo}</h2>
          <p className="seccion__bajada">{textos.fechasBajada}</p>
        </div>
        <Link to={`/catalogo?categoria=${textos.fechasCategoria}`} className="enlace-flecha">
          {textos.fechasEnlace} <Icono nombre="ir" tamano={18} />
        </Link>
      </div>
      <ul className="lista-fechas">
        {fechas.map((producto) => (
          <li key={producto.id}>
            <Link to={producto.ruta} className="fecha">
              <span className="fecha__dibujo">
                {producto.imagenPrincipal ? (
                  <img src={producto.imagenPrincipal} alt="" loading="lazy" />
                ) : (
                  <IlustracionRespaldo tipo={obtenerIlustracion(producto)} />
                )}
              </span>
              <span className="fecha__texto">
                <strong>{producto.nombre}</strong>
                <small>{producto.descripcionCorta}</small>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ServiciosResumen() {
  const { serviciosVisibles } = useCatalogo();
  if (serviciosVisibles.length === 0) return null;
  return (
    <section className="seccion seccion--servicios" aria-labelledby="titulo-servicios">
      <div className="contenedor">
        <div className="seccion__encabezado">
          <div>
            <h2 id="titulo-servicios" className="seccion__titulo">{textos.serviciosTitulo}</h2>
            <p className="seccion__bajada">{textos.serviciosBajada}</p>
          </div>
          <Link to="/servicios" className="enlace-flecha">
            {textos.serviciosEnlace} <Icono nombre="ir" tamano={18} />
          </Link>
        </div>
        <ul className="indice-servicios">
          {serviciosVisibles.map((servicio) => (
            <li key={servicio.id}>
              <Link to={servicio.ruta} className="indice-servicios__fila">
                <h3>{servicio.nombre}</h3>
                <p>{servicio.descripcionCorta}</p>
                <span className="indice-servicios__incluye">{servicio.incluye.slice(0, 4).join(", ")}</span>
                <Icono nombre="ir" tamano={22} className="indice-servicios__flecha" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SobreLena() {
  return (
    <section className="seccion contenedor sobre" aria-labelledby="titulo-sobre">
      <div className="sobre__intro">
        <h2 id="titulo-sobre" className="sobre__etiqueta">{textos.sobreTitulo}</h2>
        <p className="sobre__frase">{textos.sobreFrase}</p>
        <p className="sobre__texto">{textos.sobreTexto}</p>
      </div>
      <div className="sobre__pasos">
        <h3 className="sobre__subtitulo">{textos.pasosTitulo}</h3>
        <ol className="pasos">
          {textos.pasos.map((paso) => (
            <li key={paso.titulo}>
              <strong>{paso.titulo}</strong>
              <span>{paso.texto}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function AsociadasResumen() {
  const { empresasVisibles } = useCatalogo();
  if (empresasVisibles.length === 0) return null;
  return (
    <section className="seccion contenedor" aria-labelledby="titulo-asociadas">
      <div className="seccion__encabezado">
        <div>
          <h2 id="titulo-asociadas" className="seccion__titulo">{textos.asociadasTitulo}</h2>
          <p className="seccion__bajada">{textos.asociadasBajada}</p>
        </div>
      </div>
      <ul className="lista-asociadas lista-asociadas--compacta">
        {empresasVisibles.map((empresa) => (
          <li key={empresa.id}>
            <Link to={empresa.ruta} className={`asociada asociada--${empresa.colorAcento}`}>
              <span className="asociada__monograma" aria-hidden="true">{empresa.nombre.slice(0, 1)}</span>
              <span className="asociada__texto">
                <strong>{empresa.nombre}</strong>
                <small>{empresa.categoria}</small>
              </span>
              {empresa.proximamente && <span className="etiqueta-proximamente">{textosSitio.otrosServicios.textoProximamente}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ContactoBanda() {
  return (
    <section className="banda-contacto" aria-labelledby="titulo-contacto-inicio">
      <div className="contenedor banda-contacto__contenido">
        <div>
          <h2 id="titulo-contacto-inicio" className="banda-contacto__titulo">{textos.contactoTitulo}</h2>
          <p>{textos.contactoBajada}</p>
        </div>
        <div className="banda-contacto__acciones">
          <EnlacesContacto />
          <Link to="/catalogo" className="boton boton--oscuro">
            {textosSitio.contacto.botonCatalogo}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Inicio() {
  useMetadatos({ titulo: textos.tituloPagina });
  return (
    <>
      <Hero />
      <Destacados />
      <FechasEspeciales />
      <ServiciosResumen />
      <SobreLena />
      <AsociadasResumen />
      <ContactoBanda />
    </>
  );
}
