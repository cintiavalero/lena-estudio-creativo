/* Detalles gráficos inspirados en la imprenta. Son decorativos
   (aria-hidden) y no llevan información. */

/** Marca de registro: el círculo con cruz que se usa para alinear tintas. */
export function MarcaRegistro({ className = "" }) {
  return (
    <svg className={`marca-registro ${className}`} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="4" fill="currentColor" />
      <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** Trazo suelto, como una línea de lápiz, para acompañar títulos de página. */
export function TrazoTitulo({ className = "" }) {
  return (
    <svg className={`trazo-titulo ${className}`} viewBox="0 0 220 24" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path d="M3 15c34-9 70-11 106-6s74 6 108-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
