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
  etiqueta: (
    <>
      <path d="M70 70h50l24 30-24 30H70V70Z" fill={NS} transform="rotate(-18 100 100)" />
      <path d="M70 70h50l24 30-24 30H70V70Z" {...linea} transform="rotate(-18 100 100)" />
      <circle cx="122" cy="92" r="5" {...linea} />
      <path d="M126 88c14-14 30-12 34 0" {...linea} stroke={L} />
      <path d="M78 104h28M80 118h18" {...linea} transform="rotate(-18 100 100)" />
    </>
  ),
  taza: (
    <>
      <path d="M58 82h70v58a18 18 0 0 1-18 18H76a18 18 0 0 1-18-18V82Z" fill={LS} />
      <path d="M58 82h70v58a18 18 0 0 1-18 18H76a18 18 0 0 1-18-18V82Z" {...linea} />
      <path d="M128 96h8a14 14 0 0 1 0 28h-8" {...linea} />
      <path d="M78 46c-6 8 6 14 0 22M96 42c-6 8 6 14 0 22" {...linea} stroke={N} />
      <circle cx="93" cy="118" r="11" fill={N} />
    </>
  ),
  mate: (
    <>
      <path d="M70 92c0-10 60-10 60 0 10 18 10 46-6 62-16 14-32 14-48 0-16-16-16-44-6-62Z" fill={NS} />
      <path d="M70 92c0-10 60-10 60 0 10 18 10 46-6 62-16 14-32 14-48 0-16-16-16-44-6-62Z" {...linea} />
      <ellipse cx="100" cy="92" rx="30" ry="7" {...linea} fill="var(--color-blanco)" />
      <path d="M108 92l22-56" {...linea} stroke={L} strokeWidth="4" />
      <path d="M76 124h48" {...linea} />
    </>
  ),
  termo: (
    <>
      <rect x="76" y="58" width="48" height="110" rx="14" fill={LS} />
      <rect x="76" y="58" width="48" height="110" rx="14" {...linea} />
      <rect x="84" y="38" width="32" height="20" rx="5" {...linea} fill={N} />
      <path d="M76 92h48M76 140h48" {...linea} />
    </>
  ),
  llavero: (
    <>
      <circle cx="80" cy="70" r="18" {...linea} />
      <path d="M92 82l14 14" {...linea} />
      <path d="M104 92l40 6-6 44-40-6 6-44Z" fill={NS} />
      <path d="M104 92l40 6-6 44-40-6 6-44Z" {...linea} />
      <circle cx="120" cy="118" r="9" fill={L} />
    </>
  ),
  chapita: (
    <>
      <circle cx="100" cy="100" r="46" fill={LS} />
      <circle cx="100" cy="100" r="46" {...linea} />
      <circle cx="100" cy="100" r="32" {...linea} stroke={L} />
      <path d="M100 82l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2 6-12Z" fill={N} />
    </>
  ),
  lapicera: (
    <>
      <path d="M58 150l78-78 14 14-78 78-20 6 6-20Z" fill={LS} />
      <path d="M58 150l78-78 14 14-78 78-20 6 6-20Z" {...linea} />
      <path d="M136 72l8-8a10 10 0 0 1 14 14l-8 8" {...linea} fill={N} />
      <path d="M64 144l12 12" {...linea} />
    </>
  ),
  corazon: (
    <>
      <path d="M100 156C58 126 46 104 54 84c8-20 34-24 46-4 12-20 38-16 46 4 8 20-4 42-46 72Z" fill={NS} />
      <path d="M100 156C58 126 46 104 54 84c8-20 34-24 46-4 12-20 38-16 46 4 8 20-4 42-46 72Z" {...linea} />
      <path d="M70 92c2-8 10-12 16-10" {...linea} stroke={N} />
      <circle cx="134" cy="52" r="6" fill={L} />
    </>
  ),
  flor: (
    <>
      <path d="M100 112v56M100 146c-10-14-26-14-30-6 10 8 22 10 30 6Z" {...linea} />
      {[0, 72, 144, 216, 288].map((giro) => (
        <ellipse key={giro} cx="100" cy="68" rx="16" ry="24" fill={giro % 144 === 0 ? NS : LS} stroke={T} strokeWidth="2.4" transform={`rotate(${giro} 100 92)`} />
      ))}
      <circle cx="100" cy="92" r="12" fill={N} />
    </>
  ),
  corbata: (
    <>
      <path d="M86 46h28l-6 20 18 74-26 28-26-28 18-74-6-20Z" fill={LS} />
      <path d="M86 46h28l-6 20 18 74-26 28-26-28 18-74-6-20Z" {...linea} />
      <path d="M92 66h16" {...linea} />
      <path d="M94 96l14 10M90 120l20 14" {...linea} stroke={N} />
    </>
  ),
  arbol: (
    <>
      <path d="M100 40l34 46h-16l26 34h-18l24 32H50l24-32H56l26-34H66l34-46Z" fill={LS} />
      <path d="M100 40l34 46h-16l26 34h-18l24 32H50l24-32H56l26-34H66l34-46Z" {...linea} />
      <path d="M92 152h16v18H92z" {...linea} />
      <circle cx="88" cy="108" r="5" fill={N} />
      <circle cx="114" cy="132" r="5" fill={N} />
      <circle cx="104" cy="82" r="5" fill={L} />
    </>
  ),
  huevo: (
    <>
      <path d="M100 44c26 0 42 44 42 70a42 42 0 0 1-84 0c0-26 16-70 42-70Z" fill={NS} />
      <path d="M100 44c26 0 42 44 42 70a42 42 0 0 1-84 0c0-26 16-70 42-70Z" {...linea} />
      <path d="M62 110l12-10 12 10 14-10 14 10 12-10 12 10" {...linea} stroke={L} />
      <circle cx="86" cy="134" r="5" fill={N} />
      <circle cx="114" cy="134" r="5" fill={N} />
    </>
  ),
  globo: (
    <>
      <ellipse cx="100" cy="82" rx="36" ry="42" fill={NS} />
      <ellipse cx="100" cy="82" rx="36" ry="42" {...linea} />
      <path d="M94 124h12l-6 8-6-8Z" {...linea} />
      <path d="M100 132c-10 12 10 20 0 32s8 16 4 22" {...linea} />
      <path d="M80 66c4-10 12-14 18-14" {...linea} stroke={N} />
      <circle cx="146" cy="58" r="10" fill={L} />
    </>
  ),
  birrete: (
    <>
      <path d="M100 58l64 26-64 26-64-26 64-26Z" fill={LS} />
      <path d="M100 58l64 26-64 26-64-26 64-26Z" {...linea} />
      <path d="M66 98v30c0 10 68 10 68 0V98" {...linea} />
      <path d="M152 88v40" {...linea} stroke={N} />
      <circle cx="152" cy="134" r="6" fill={N} />
    </>
  ),
  manzana: (
    <>
      <path d="M100 74c-14-10-48-8-50 24-2 32 22 64 38 60 6-2 8-4 12-4s6 2 12 4c16 4 40-28 38-60-2-32-36-34-50-24Z" fill={NS} />
      <path d="M100 74c-14-10-48-8-50 24-2 32 22 64 38 60 6-2 8-4 12-4s6 2 12 4c16 4 40-28 38-60-2-32-36-34-50-24Z" {...linea} />
      <path d="M100 74c0-12 4-22 12-28" {...linea} />
      <path d="M108 56c10-12 26-12 30-4-10 10-24 10-30 4Z" fill={L} />
    </>
  ),
  banderines: (
    <>
      <path d="M30 60c46 26 94 26 140 0" {...linea} />
      {[
        [48, 70, NS], [76, 80, LS], [104, 82, NS], [132, 76, LS],
      ].map(([x, y, color]) => (
        <path key={x} d={`M${x} ${y}l24 2-10 34-14-36Z`} fill={color} stroke={T} strokeWidth="2.4" strokeLinejoin="round" />
      ))}
      <circle cx="160" cy="68" r="5" fill={N} />
    </>
  ),
  credencial: (
    <>
      <path d="M76 30l24 46 24-46" {...linea} stroke={L} />
      <rect x="64" y="76" width="72" height="96" rx="8" fill="var(--color-blanco)" />
      <rect x="64" y="76" width="72" height="96" rx="8" {...linea} />
      <circle cx="100" cy="110" r="14" fill={N} />
      <path d="M82 140h36M88 154h24" {...linea} />
    </>
  ),
  almohadon: (
    <>
      <path d="M52 56c32 8 64 8 96 0 8 30 8 58 0 88-32-8-64-8-96 0-8-30-8-58 0-88Z" fill={LS} />
      <path d="M52 56c32 8 64 8 96 0 8 30 8 58 0 88-32-8-64-8-96 0-8-30-8-58 0-88Z" {...linea} />
      <path d="M100 82c8-12 26-6 20 10-4 10-20 18-20 18s-16-8-20-18c-6-16 12-22 20-10Z" fill={N} />
    </>
  ),
  gorra: (
    <>
      <path d="M50 120c0-40 22-62 52-62s48 22 48 56H50Z" fill={NS} />
      <path d="M50 120c0-40 22-62 52-62s48 22 48 56H50Z" {...linea} />
      <path d="M50 120h112c4 0 6 8 0 10H50" {...linea} />
      <path d="M100 58v62" {...linea} />
      <circle cx="100" cy="56" r="5" fill={L} />
    </>
  ),
  delantal: (
    <>
      <path d="M76 52h48v26l18 12v72H58V90l18-12V52Z" fill={LS} />
      <path d="M76 52h48v26l18 12v72H58V90l18-12V52Z" {...linea} />
      <path d="M76 52c0-14 48-14 48 0M58 92l-20 4M142 92l20 4" {...linea} />
      <rect x="82" y="116" width="36" height="24" rx="3" {...linea} fill={N} />
    </>
  ),
  bandera: (
    <>
      <path d="M44 70h112L100 160 44 70Z" fill={NS} />
      <path d="M44 70h112L100 160 44 70Z" {...linea} />
      <circle cx="80" cy="88" r="6" fill={L} />
      <circle cx="116" cy="90" r="6" fill={L} />
      <circle cx="100" cy="116" r="6" fill={L} />
      <path d="M44 70c-8-4-14 0-16 6M156 70c8-4 14 0 16 6" {...linea} />
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
