/* Muestra su contenido con una animación suave cuando entra en pantalla.
   Si la persona pidió "reducir movimiento" en su sistema, no anima. */

import { useEffect, useRef, useState } from "react";

export default function Revelar({ children, como: Etiqueta = "div", className = "", retraso = 0, ...resto }) {
  const referencia = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elemento = referencia.current;
    if (!elemento || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((entrada) => entrada.isIntersecting)) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <Etiqueta
      ref={referencia}
      className={`revelar ${visible ? "revelar--visible" : ""} ${className}`}
      style={retraso ? { "--retraso": `${retraso}ms` } : undefined}
      {...resto}
    >
      {children}
    </Etiqueta>
  );
}
