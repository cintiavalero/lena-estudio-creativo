/* =====================================================================
   Dibujos de respaldo para productos sin foto.
   Se elige según la "ilustracion" de la primera categoría del producto.
   Son dibujos de línea simples en los colores de LENA.
   ===================================================================== */

const T = "var(--color-tinta)";
const N = "var(--color-naranja)";
const L = "var(--color-lavanda)";
const NS = "var(--color-naranja-suave)";
const LS = "var(--color-lavanda-suave)";
const linea = { fill: "none", stroke: T, strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" };

const dibujos = {
  caja: (
    <>
      <path d="M50 82l50-22 50 22v62l-50 24-50-24V82Z" fill={NS} />
      <path d="M50 82l50 22 50-22M100 104v64" {...linea} />
      <path d="M50 82l50-22 50 22v62l-50 24-50-24V82Z" {...linea} />
      <path d="M72 72l50 22v20" {...linea} stroke={N} />
      <circle cx="78" cy="128" r="9" fill={L} />
    </>
  ),
  bolsa: (
    <>
      <path d="M58 78h84l-6 92H64l-6-92Z" fill={LS} />
      <path d="M58 78h84l-6 92H64l-6-92Z" {...linea} />
      <path d="M80 78V64a20 20 0 0 1 40 0v14" {...linea} />
      <path d="M84 118c8-12 24-12 32 0s-8 26-16 26-24-14-16-26Z" fill={N} />
    </>
  ),
  remera: (
    <>
      <path d="M72 52l-30 18 12 26 14-8v82h64V88l14 8 12-26-30-18c-4 10-14 16-28 16s-24-6-28-16Z" fill={LS} />
      <path d="M72 52l-30 18 12 26 14-8v82h64V88l14 8 12-26-30-18c-4 10-14 16-28 16s-24-6-28-16Z" {...linea} />
      <circle cx="100" cy="116" r="14" fill={N} />
    </>
  ),
  papel: (
    <>
      <rect x="66" y="52" width="76" height="104" rx="3" fill={LS} transform="rotate(6 104 104)" />
      <rect x="56" y="46" width="76" height="104" rx="3" fill="var(--color-blanco)" />
      <rect x="56" y="46" width="76" height="104" rx="3" {...linea} />
      <path d="M68 72h40M68 88h52M68 104h30" {...linea} />
      <circle cx="112" cy="128" r="10" fill={N} />
    </>
  ),
  cuaderno: (
    <>
      <rect x="62" y="44" width="80" height="112" rx="4" fill={NS} />
      <rect x="62" y="44" width="80" height="112" rx="4" {...linea} />
      <path d="M56 60h12M56 80h12M56 100h12M56 120h12M56 140h12" {...linea} />
      <path d="M82 76h44M82 92h30" {...linea} stroke={L} />
    </>
  ),
  regalo: (
    <>
      <rect x="54" y="88" width="92" height="70" fill={LS} />
      <rect x="54" y="88" width="92" height="70" {...linea} />
      <rect x="48" y="72" width="104" height="18" {...linea} fill="var(--color-blanco)" />
      <path d="M100 72v86" stroke={N} strokeWidth="6" />
      <path d="M100 72c-10-22-34-18-28-4 4 8 28 4 28 4Zm0 0c10-22 34-18 28-4-4 8-28 4-28 4Z" {...linea} />
    </>
  ),
  evento: (
    <>
      <path d="M48 110c0-10 104-10 104 0v12c0 10-104 10-104 0v-12Z" fill={NS} />
      <path d="M48 110c0-10 104-10 104 0v12c0 10-104 10-104 0v-12Z" {...linea} />
      <rect x="88" y="104" width="24" height="24" rx="3" fill={L} />
      <path d="M60 64l8 10M140 58l-6 12M100 48v14M76 150l-8 8M128 150l8 8" {...linea} stroke={N} />
    </>
  ),
  cartel: (
    <>
      <rect x="66" y="40" width="68" height="108" fill={LS} />
      <rect x="66" y="40" width="68" height="108" {...linea} />
      <path d="M60 148h80M100 148v14M84 164h32" {...linea} />
      <path d="M78 62h44M78 76h30" {...linea} />
      <circle cx="100" cy="114" r="16" fill={N} />
    </>
  ),
  negocio: (
    <>
      <path d="M52 86h96v72H52z" fill={NS} />
      <path d="M52 86h96v72H52zM46 70h108l-6 16H52l-6-16Z" {...linea} />
      <path d="M84 158v-34h32v34" {...linea} />
      <path d="M58 70l8-18h68l8 18" {...linea} stroke={L} />
    </>
  ),
  cuadro: (
    <>
      <rect x="54" y="52" width="92" height="96" fill={LS} />
      <rect x="54" y="52" width="92" height="96" {...linea} />
      <path d="M66 136l24-30 18 20 14-14 14 24" {...linea} />
      <circle cx="122" cy="76" r="9" fill={N} />
    </>
  ),
  estrella: (
    <>
      <path d="M100 46l14 34 36 4-27 24 8 36-31-18-31 18 8-36-27-24 36-4 14-34Z" fill={NS} />
      <path d="M100 46l14 34 36 4-27 24 8 36-31-18-31 18 8-36-27-24 36-4 14-34Z" {...linea} />
      <circle cx="100" cy="104" r="8" fill={L} />
    </>
  ),
};

export default function IlustracionRespaldo({ tipo = "estrella", className = "" }) {
  return (
    <svg className={`ilustracion-respaldo ${className}`} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      {dibujos[tipo] || dibujos.estrella}
    </svg>
  );
}
