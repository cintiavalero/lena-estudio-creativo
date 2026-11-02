/* =====================================================================
   Galería deslizable (estilo TikTok / Instagram).
   Si hay varias fotos, se pasan deslizando con el dedo (o con las
   flechas en la compu) y unos puntitos indican cuál se está viendo.
   Tocar la foto lleva a "enlace".
   ===================================================================== */

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImagenProducto from "./ImagenProducto.jsx";
import Icono from "./Icono.jsx";

export default function GaleriaDeslizable({ fotos, textoAlternativo, ilustracion, enlace, proporcion = "4 / 5", nombre }) {
  const pista = useRef(null);
  const [activa, setActiva] = useState(0);
  const varias = fotos.length > 1;

  const alDeslizar = () => {
    const elemento = pista.current;
    if (!elemento) return;
    const indice = Math.round(elemento.scrollLeft / elemento.clientWidth);
    if (indice !== activa) setActiva(indice);
  };

  const irA = (indice) => {
    const elemento = pista.current;
    if (!elemento) return;
    const destino = Math.max(0, Math.min(fotos.length - 1, indice));
    elemento.scrollTo({ left: destino * elemento.clientWidth, behavior: "smooth" });
  };

  if (!varias) {
    return (
      <Link to={enlace} className="galeria-deslizable" style={{ aspectRatio: proporcion }} tabIndex={-1} aria-hidden="true">
        <ImagenProducto src={fotos[0]} alt={textoAlternativo} ilustracion={ilustracion} />
      </Link>
    );
  }

  return (
    <div className="galeria-deslizable galeria-deslizable--varias" style={{ aspectRatio: proporcion }}>
      <div className="galeria-deslizable__pista" ref={pista} onScroll={alDeslizar}>
        {fotos.map((foto, indice) => (
          <Link key={foto} to={enlace} className="galeria-deslizable__foto" tabIndex={-1} aria-hidden="true" draggable="false">
            <ImagenProducto src={foto} alt={indice === 0 ? textoAlternativo : ""} ilustracion={ilustracion} />
          </Link>
        ))}
      </div>

      <div className="galeria-deslizable__puntos" aria-hidden="true">
        {fotos.map((foto, indice) => (
          <span key={foto} className={indice === activa ? "activo" : ""} />
        ))}
      </div>
      <span className="galeria-deslizable__contador" aria-hidden="true">
        {activa + 1}/{fotos.length}
      </span>

      <button
        type="button"
        className="galeria-deslizable__flecha galeria-deslizable__flecha--anterior"
        onClick={() => irA(activa - 1)}
        disabled={activa === 0}
        aria-label={`Foto anterior de ${nombre}`}
      >
        <Icono nombre="volver" tamano={16} />
      </button>
      <button
        type="button"
        className="galeria-deslizable__flecha galeria-deslizable__flecha--siguiente"
        onClick={() => irA(activa + 1)}
        disabled={activa === fotos.length - 1}
        aria-label={`Foto siguiente de ${nombre}`}
      >
        <Icono nombre="ir" tamano={16} />
      </button>
    </div>
  );
}
