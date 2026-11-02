/* Marcas de corte de imprenta en las cuatro esquinas de un elemento.
   Es el detalle gráfico propio del sitio: aparecen al pasar el mouse
   por los productos y enmarcan el collage del inicio. */

export default function MarcasCorte({ className = "" }) {
  return (
    <span className={`marcas-corte ${className}`} aria-hidden="true">
      <span className="marcas-corte__esquina marcas-corte__esquina--si" />
      <span className="marcas-corte__esquina marcas-corte__esquina--sd" />
      <span className="marcas-corte__esquina marcas-corte__esquina--ii" />
      <span className="marcas-corte__esquina marcas-corte__esquina--id" />
    </span>
  );
}
