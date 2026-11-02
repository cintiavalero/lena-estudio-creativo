/* Control de cantidad:  −  [ 2 ]  +  */

import { useEffect, useState } from "react";
import Icono from "./Icono.jsx";

export default function SelectorCantidad({ valor, minimo = 1, maximo = 999, alCambiar, etiqueta = "Cantidad", id, compacto = false }) {
  const [texto, setTexto] = useState(String(valor));
  useEffect(() => setTexto(String(valor)), [valor]);

  const confirmar = (nuevo) => {
    const numero = Math.floor(Number(nuevo));
    const ajustado = Number.isFinite(numero) ? Math.min(Math.max(numero, minimo), maximo) : valor;
    setTexto(String(ajustado));
    if (ajustado !== valor) alCambiar(ajustado);
  };

  return (
    <div className={`selector-cantidad ${compacto ? "selector-cantidad--compacto" : ""}`} role="group" aria-label={etiqueta}>
      <button type="button" onClick={() => confirmar(valor - 1)} disabled={valor <= minimo} aria-label={`Restar uno a ${etiqueta.toLowerCase()}`}>
        <Icono nombre="menos" tamano={16} />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={minimo}
        max={maximo}
        value={texto}
        aria-label={etiqueta}
        onChange={(evento) => setTexto(evento.target.value)}
        onBlur={(evento) => confirmar(evento.target.value)}
        onKeyDown={(evento) => {
          if (evento.key === "Enter") {
            evento.preventDefault();
            confirmar(evento.currentTarget.value);
          }
        }}
      />
      <button type="button" onClick={() => confirmar(valor + 1)} disabled={valor >= maximo} aria-label={`Sumar uno a ${etiqueta.toLowerCase()}`}>
        <Icono nombre="mas" tamano={16} />
      </button>
    </div>
  );
}
