/* Aviso breve "Agregado a tu pedido" que aparece abajo de la pantalla. */

import textosSitio from "../../contenido/textosSitio.js";
import { useCarrito } from "../../estado/CarritoContext.jsx";
import Icono from "../comunes/Icono.jsx";

export default function AvisoAgregado() {
  const { avisoAgregado, cerrarAviso, abrirPanel } = useCarrito();
  return (
    <div className="aviso-agregado-zona" role="status" aria-live="polite">
      {avisoAgregado && (
        <div className="aviso-agregado" key={avisoAgregado.momento}>
          <span className="aviso-agregado__icono">
            <Icono nombre="check" tamano={18} />
          </span>
          <p>
            <strong>{textosSitio.carrito.avisoAgregado}</strong>
            <span>{avisoAgregado.nombre}</span>
          </p>
          <button
            type="button"
            className="boton-texto aviso-agregado__ver"
            onClick={() => {
              cerrarAviso();
              abrirPanel();
            }}
          >
            Ver pedido
          </button>
          <button type="button" className="boton-icono" onClick={cerrarAviso}>
            <Icono nombre="cerrar" tamano={18} />
            <span className="solo-lectores">Cerrar aviso</span>
          </button>
        </div>
      )}
    </div>
  );
}
