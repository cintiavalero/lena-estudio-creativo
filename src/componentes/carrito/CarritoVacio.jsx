import { Link } from "react-router-dom";
import textosSitio from "../../contenido/textosSitio.js";

const textos = textosSitio.carrito;

/* Dibujo de una caja abierta con marcas de corte: el pedido está por armarse. */
function DibujoCajaVacia() {
  return (
    <svg className="carrito-vacio__dibujo" viewBox="0 0 160 120" aria-hidden="true">
      <path d="M40 54l40-16 40 16v42l-40 16-40-16V54Z" fill="var(--color-lavanda-suave)" />
      <path d="M40 54l40 16 40-16M80 70v42M40 54l40-16 40 16v42l-40 16-40-16V54Z" fill="none" stroke="var(--color-tinta)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M40 54l-14-16 40-14 14 14M120 54l14-16-40-14-14 14" fill="none" stroke="var(--color-naranja)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 10h12M16 4v12M138 10h12M144 4v12" stroke="var(--color-gris-texto)" strokeWidth="1.2" />
    </svg>
  );
}

export default function CarritoVacio({ compacto = false, alNavegar }) {
  return (
    <div className={`carrito-vacio ${compacto ? "carrito-vacio--compacto" : ""}`}>
      <DibujoCajaVacia />
      <h2 className="carrito-vacio__titulo">{textos.vacioTitulo}</h2>
      <p>{textos.vacioTexto}</p>
      <Link to="/catalogo" className="boton boton--principal" onClick={alNavegar}>
        {textos.botonSeguir}
      </Link>
    </div>
  );
}
