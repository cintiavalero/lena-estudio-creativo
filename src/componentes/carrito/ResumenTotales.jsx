/* Totales del pedido. Nunca muestra un total definitivo si falta cotizar algo. */

import textosSitio from "../../contenido/textosSitio.js";
import configuracionPedidos from "../../contenido/configuracionPedidos.js";

const textos = textosSitio.carrito;

export default function ResumenTotales({ totales }) {
  if (totales.estadoTotal === "vacio") return null;
  return (
    <div className="resumen-totales" aria-live="polite">
      <dl>
        {totales.lineasConPrecio > 0 && (
          <div className="resumen-totales__fila">
            <dt>{textos.textoSubtotalConocido}</dt>
            <dd>{totales.textoSubtotalConocido}</dd>
          </div>
        )}
        {totales.cantidadPendientes > 0 && (
          <div className="resumen-totales__fila">
            <dt>{textos.textoPendientes}</dt>
            <dd>{totales.cantidadPendientes}</dd>
          </div>
        )}
        <div className="resumen-totales__fila resumen-totales__fila--total">
          <dt>{textos.textoTotal}</dt>
          <dd>{totales.estadoTotal === "definido" ? totales.textoTotalDefinitivo : configuracionPedidos.textoTotalPendiente}</dd>
        </div>
      </dl>
      {totales.hayImportesSinDefinir && <p className="resumen-totales__aviso">{textos.avisoPendientes}</p>}
      {totales.lineasConPrecio > 0 && <p className="resumen-totales__aviso">{textos.avisoOrientativo}</p>}
    </div>
  );
}
