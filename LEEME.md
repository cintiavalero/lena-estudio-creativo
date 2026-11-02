# Sitio web de LENA · Guía de uso y mantenimiento

Esta guía explica, paso a paso y sin dar nada por sabido, cómo modificar el sitio de LENA y cómo publicarlo. Está pensada para alguien que **no sabe programar**.

La guía tiene dos partes:

- **Parte A · Tareas habituales:** cambiar textos, fotos, precios y productos. Es lo que vas a hacer más seguido.
- **Parte B · Tareas técnicas:** instalar programas, ver el sitio en tu compu, subirlo a GitHub y publicarlo en Vercel. Se hace pocas veces.

> 💡 **Si es la primera vez**, empezá por la [Parte B, pasos 1 a 8](#parte-b--tareas-técnicas) para poder ver el sitio en tu computadora. Después volvé a la Parte A.

---

## Índice

- [Qué contiene el proyecto](#qué-contiene-el-proyecto)
- [Mapa rápido: qué archivo edito para…](#mapa-rápido-qué-archivo-edito-para)
- [Reglas de oro para editar sin romper nada](#reglas-de-oro-para-editar-sin-romper-nada)
- **Parte A · Tareas habituales**
  - [A1. Cambiar el nombre o la descripción de un producto](#a1-cambiar-el-nombre-o-la-descripción-de-un-producto)
  - [A2. Agregar un producto](#a2-agregar-un-producto)
  - [A3. Ocultar un producto](#a3-ocultar-un-producto)
  - [A4. Cambiar una fotografía](#a4-cambiar-una-fotografía)
  - [A5. Agregar imágenes nuevas](#a5-agregar-imágenes-nuevas)
  - [A6. Modificar un precio](#a6-modificar-un-precio)
  - [A7. Marcar productos como destacados](#a7-marcar-productos-como-destacados)
  - [A8. Producto del catálogo, personalizable o ambos](#a8-producto-del-catálogo-personalizable-o-ambos)
  - [A9. Editar las preguntas de personalización](#a9-editar-las-preguntas-de-personalización)
  - [A10. Cambiar los colores y las tipografías](#a10-cambiar-los-colores-y-las-tipografías)
  - [A11. Modificar textos](#a11-modificar-textos)
  - [A12. Cambiar los enlaces de redes sociales](#a12-cambiar-los-enlaces-de-redes-sociales)
  - [A13. Editar la información de contacto y el WhatsApp](#a13-editar-la-información-de-contacto-y-el-whatsapp)
  - [A14. Agregar una nueva categoría](#a14-agregar-una-nueva-categoría)
  - [A15. Editar los servicios creativos](#a15-editar-los-servicios-creativos)
  - [A16. Agregar una empresa asociada](#a16-agregar-una-empresa-asociada)
  - [A17. Cómo funciona el carrito y el envío por WhatsApp](#a17-cómo-funciona-el-carrito-y-el-envío-por-whatsapp)
- **Parte B · Tareas técnicas**
  - [B1. Programas que hay que instalar](#b1-programas-que-hay-que-instalar)
  - [B2. Instalar Node.js](#b2-instalar-nodejs)
  - [B3. Guardar la carpeta del proyecto en Documentos](#b3-guardar-la-carpeta-del-proyecto-en-documentos)
  - [B4. Abrir el proyecto con Visual Studio Code](#b4-abrir-el-proyecto-con-visual-studio-code)
  - [B5. Abrir una terminal dentro del editor](#b5-abrir-una-terminal-dentro-del-editor)
  - [B6. Instalar las dependencias](#b6-instalar-las-dependencias)
  - [B7. Iniciar el sitio en modo desarrollo](#b7-iniciar-el-sitio-en-modo-desarrollo)
  - [B8. Abrirlo en el navegador](#b8-abrirlo-en-el-navegador)
  - [B9. Detener el servidor local](#b9-detener-el-servidor-local)
  - [B10. Generar una versión lista para publicar](#b10-generar-una-versión-lista-para-publicar)
  - [B11. Publicar el proyecto en GitHub](#b11-publicar-el-proyecto-en-github)
  - [B12. Conectar GitHub con Vercel](#b12-conectar-github-con-vercel)
  - [B13. Actualizar el sitio publicado después de hacer cambios](#b13-actualizar-el-sitio-publicado-después-de-hacer-cambios)
  - [B14. Resolver errores frecuentes](#b14-resolver-errores-frecuentes)
- [Antes de publicar: datos pendientes](#antes-de-publicar-datos-pendientes)
- [Para quien programe: arquitectura](#para-quien-programe-arquitectura)

---

## Qué contiene el proyecto

```
lena-estudio-creativo/
├── LEEME.md                 ← esta guía
├── public/
│   └── imagenes/
│       ├── marca/           ← logo de LENA e imagen para compartir
│       ├── productos/       ← ✏️ fotos de los productos
│       └── servicios/       ← ✏️ fotos de los servicios creativos
├── src/
│   ├── contenido/           ← ✏️ TODO lo que se edita habitualmente está acá
│   │   ├── configuracionSitio.js    nombre, logo, WhatsApp, email, dirección web
│   │   ├── coloresTema.js           colores y tipografías
│   │   ├── textosSitio.js           títulos, textos y botones de cada página
│   │   ├── navegacion.js            menú de arriba y de abajo
│   │   ├── categorias.js            categorías del catálogo
│   │   ├── productos/               productos, fotos y precios (un archivo por categoría)
│   │   │   ├── todosLosProductos.js     explicación de cada dato + ejemplo
│   │   │   ├── papeleriaImpresos.js     Papelería & Impresos
│   │   │   ├── merchRegalos.js          Merch & Regalos
│   │   │   ├── temporadasFechasEspeciales.js   Día de la Madre, Navidad…
│   │   │   └── …                        (uno por cada categoría)
│   │   ├── personalizaciones.js     preguntas para pedidos personalizados
│   │   ├── servicios.js             servicios creativos de LENA
│   │   ├── empresasAsociadas.js     Valero IT, Push, RompeHielo
│   │   ├── redesSociales.js         Instagram, Pinterest, etc.
│   │   └── configuracionPedidos.js  textos del carrito y del mensaje de WhatsApp
│   ├── componentes/         ← ⚙️ piezas visuales (no hace falta tocarlas)
│   ├── paginas/             ← ⚙️ páginas del sitio (no hace falta tocarlas)
│   ├── logica/              ← ⚙️ precios, carrito, WhatsApp (no tocar)
│   ├── estado/              ← ⚙️ memoria del carrito (no tocar)
│   └── estilos/             ← ⚙️ diseño (CSS)
├── pruebas/                 ← ⚙️ pruebas automáticas del carrito
├── package.json             ← ⚙️ lista de dependencias y comandos
├── vite.config.js           ← ⚙️ configuración técnica
└── vercel.json              ← ⚙️ configuración para publicar en Vercel
```

**Regla simple:** lo que tiene ✏️ se edita; lo que tiene ⚙️ no hace falta tocarlo.

## Mapa rápido: qué archivo edito para…

| Quiero…                                         | Archivo                                       |
| ----------------------------------------------- | --------------------------------------------- |
| Cambiar un producto, su foto o su precio        | carpeta `src/contenido/productos/` (archivo de su categoría) |
| Agregar una foto nueva                          | carpeta `public/imagenes/productos/`          |
| Cambiar el número de WhatsApp o el email        | `src/contenido/configuracionSitio.js`         |
| Cambiar Instagram o Pinterest                   | `src/contenido/redesSociales.js`              |
| Cambiar el título grande del inicio             | `src/contenido/textosSitio.js`                |
| Cambiar los colores                             | `src/contenido/coloresTema.js`                |
| Crear o renombrar una categoría                 | `src/contenido/categorias.js`                 |
| Cambiar las preguntas del formulario a medida   | `src/contenido/personalizaciones.js`          |
| Editar los servicios creativos                  | `src/contenido/servicios.js`                  |
| Editar Valero IT, Push o RompeHielo             | `src/contenido/empresasAsociadas.js`          |
| Cambiar el saludo del mensaje de WhatsApp       | `src/contenido/configuracionPedidos.js`       |

## Reglas de oro para editar sin romper nada

1. **Cambiá solo lo que está entre comillas.** En `nombre: "Agendas personalizadas",` se cambia el texto entre `"` y `"`.
2. **No borres las comas del final** de cada línea ni las llaves `{ }` o corchetes `[ ]`.
3. **Si un texto lleva comillas adentro**, usá comillas simples o « »: `"La agenda 'Floral'"`.
4. **Los números van sin comillas**: `precio: 8500,` (bien) / `precio: "8500",` (evitalo).
5. **Guardá con `Ctrl + S`.** Si el sitio está abierto en modo desarrollo (Parte B7), el navegador se actualiza solo.
6. **Si algo se rompe**, apretá `Ctrl + Z` varias veces en el editor hasta volver a como estaba y guardá de nuevo.
7. Cada archivo de `src/contenido` empieza con un comentario que explica qué se puede cambiar. Leelo antes de editar.

> 💡 En Visual Studio Code, los textos entre comillas se ven de un color y los nombres de los datos de otro. Si de golpe medio archivo cambia de color, probablemente falte una comilla.

---

# Parte A · Tareas habituales

## Dónde están los productos

Los productos están en la carpeta `src/contenido/productos/`, **un archivo por categoría**:

| Archivo                            | Categoría principal               |
| ---------------------------------- | --------------------------------- |
| `papeleriaImpresos.js`             | Papelería & Impresos              |
| `packagingCajas.js`                | Packaging & Cajas                 |
| `textilEstampados.js`              | Textil & Estampados               |
| `merchRegalos.js`                  | Merch & Regalos                   |
| `eventosCelebraciones.js`          | Eventos & Celebraciones           |
| `carteleriaGranFormato.js`         | Cartelería & Gran Formato         |
| `emprendedoresNegocios.js`         | Emprendedores & Negocios          |
| `decoracionPersonalizados.js`      | Decoración & Personalizados       |
| `oficinaEducacion.js`              | Oficina & Educación               |
| `temporadasFechasEspeciales.js`    | Día de la Madre, San Valentín, Navidad y demás fechas |

Cada producto está en el archivo de su **categoría principal**, que es la primera de su lista `categorias`. Igual puede aparecer en otras categorías del sitio: por ejemplo, "Regalos para el Día de la Madre" está en `temporadasFechasEspeciales.js`, pero también se ve en Merch & Regalos.

> 💡 **¿No sabés en qué archivo está un producto?** En Visual Studio Code apretá `Ctrl + Shift + F` (buscar en todos los archivos) y escribí su nombre.

El archivo `todosLosProductos.js` explica qué significa cada dato y trae un ejemplo completo. No hace falta tocarlo, salvo que crees un archivo de productos nuevo.

## A1. Cambiar el nombre o la descripción de un producto

1. Abrí el archivo de su categoría en `src/contenido/productos/`.
2. Apretá `Ctrl + F` y buscá el nombre del producto, por ejemplo `Agendas` (está en `papeleriaImpresos.js`).
3. Cambiá el texto entre comillas de `nombre`, `descripcionCorta` (la que se ve en las tarjetas) o `descripcionExtendida` (la de la página del producto).
4. Guardá con `Ctrl + S`.

**Ejemplo concreto.** Antes:

```js
    nombre: "Agendas personalizadas",
    descripcionCorta: "Diarias, semanales o para turnos, con tapa e interior pensados para tu año.",
```

Después:

```js
    nombre: "Agendas 2027",
    descripcionCorta: "Diarias o semanales, con tapas ilustradas por LENA.",
```

El cambio aparece solo en el inicio, en el catálogo, en la página del producto, en el carrito y en el mensaje de WhatsApp. No hay que cambiarlo en ningún otro lugar.

> ⚠️ **No cambies el `idProducto`** salvo que sea necesario: es la dirección web del producto. Si lo cambiás, los clientes que tenían ese producto en el carrito lo verán como "no disponible" y tendrán que agregarlo de nuevo.

## A2. Agregar un producto

1. Copiá la foto en `public/imagenes/productos/` (ver [A5](#a5-agregar-imágenes-nuevas)).
2. Abrí el archivo de la categoría principal del producto nuevo en `src/contenido/productos/` (por ejemplo, unas tazas van en `merchRegalos.js`).
3. Buscá un producto parecido al que querés agregar y **copiá su bloque completo**: desde la `{` hasta la `},` (incluida la coma).
4. Pegalo justo debajo de otro producto (después de su `},`).
5. Cambiá los datos. Lo mínimo:
   - `idProducto`: un nombre nuevo, único, en minúsculas, con guiones y sin tildes ni espacios. Ej: `"tazas-personalizadas"`.
   - `nombre`, `descripcionCorta`, `categorias`, `imagenPrincipal`, `textoAlternativo`.
   - `precio` y `tipoPrecio` (ver [A6](#a6-modificar-un-precio)).
   - `orden`: un número; los más chicos aparecen primero.
6. Guardá.

Al principio de `todosLosProductos.js` hay un **ejemplo completo comentado** listo para copiar.

> ⚠️ El `idProducto` no se puede repetir **en ningún archivo** de la carpeta.

Ejemplo de producto nuevo:

```js
  {
    idProducto: "tazas-personalizadas",
    nombre: "Tazas personalizadas",
    descripcionCorta: "Tazas con tu diseño, nombre o logo.",
    descripcionExtendida: "",
    categorias: ["merch-regalos"],
    etiquetas: ["taza", "regalo"],
    imagenPrincipal: "/imagenes/productos/taza-lena.jpg",
    imagenesAdicionales: [],
    textoAlternativo: "Taza blanca con ilustración de flores",
    ilustracion: "taza",
    precio: 9500,
    tipoPrecio: "fijo",
    permiteCompraEstandar: true,
    permitePersonalizacion: true,
    formularioPersonalizacion: "general",
    aceptaArchivosReferencia: true,
    variantes: null,
    cantidadMinima: 1,
    cantidadMaxima: 200,
    productoDestacado: false,
    mostrarProducto: true,
    orden: 200,
  },
```

> 💡 **Productos sin foto:** muchos productos todavía no tienen foto propia y muestran un dibujo (una taza, un mate, una flor…). El dibujo se elige con el dato `ilustracion`. Cuando tengas la foto, cargala en `imagenPrincipal` y el dibujo deja de mostrarse solo.

### Cómo se ordena el catálogo

- En la vista **"Todo"**, el catálogo se muestra **agrupado por categoría**: aparecen los primeros 4 productos de cada una y un botón "Ver todo".
- Cada producto aparece en el grupo de su categoría principal, ordenado por su número de `orden` (más chico primero).
- **Conviene darles un `orden` bajo a los productos con foto**, así son los primeros que se ven.
- En el inicio, la sección **"Para cada fecha"** muestra solos todos los productos de la categoría Temporadas & Fechas Especiales.

## A3. Ocultar un producto

En el archivo de su categoría, buscá el producto y cambiá:

```js
    mostrarProducto: true,
```

por:

```js
    mostrarProducto: false,
```

El producto desaparece del sitio pero sigue guardado; para volver a mostrarlo, ponelo otra vez en `true`. Si una categoría se queda sin productos visibles, también deja de aparecer en los filtros.

## A4. Cambiar una fotografía

1. Copiá la foto nueva en `public/imagenes/productos/`. Por ejemplo `agenda-floral.jpg`.
2. En el archivo de su categoría (carpeta `src/contenido/productos/`), buscá el producto y cambiá la línea `imagenPrincipal`:

```js
    imagenPrincipal: "/imagenes/productos/agenda-floral.jpg",
```

3. Actualizá también `textoAlternativo` con una descripción breve de lo que se ve en la foto. Por ejemplo: `"Agenda con tapa floral sobre un escritorio"`. Sirve para personas que usan lectores de pantalla y para Google.
4. Guardá.

Para agregar **más fotos** a la galería del producto, usá `imagenesAdicionales`:

```js
    imagenesAdicionales: ["/imagenes/productos/agenda-interior.jpg", "/imagenes/productos/agenda-tapa.jpg"],
```

Si un producto no tiene foto (`imagenPrincipal: ""`), o la foto no se encuentra, el sitio muestra automáticamente un dibujo: el de su dato `ilustracion` o, si está vacío, el de su categoría. Nunca aparece una imagen rota.

Dibujos disponibles para `ilustracion`: `"papel"`, `"caja"`, `"bolsa"`, `"remera"`, `"gorra"`, `"delantal"`, `"bandera"`, `"regalo"`, `"taza"`, `"mate"`, `"termo"`, `"llavero"`, `"chapita"`, `"lapicera"`, `"corazon"`, `"flor"`, `"corbata"`, `"arbol"`, `"huevo"`, `"globo"`, `"birrete"`, `"manzana"`, `"evento"`, `"banderines"`, `"credencial"`, `"cartel"`, `"negocio"`, `"cuadro"`, `"almohadon"`, `"cuaderno"`, `"etiqueta"` y `"estrella"`.

> ⚠️ La ruta empieza con `/imagenes/…`, **sin** la palabra `public`.

## A5. Agregar imágenes nuevas

1. Prepará la foto:
   - Formato **JPG** para fotos (o **PNG** si necesita fondo transparente, o **WebP**).
   - Tamaño recomendado: **1200 a 1600 px** de lado mayor. Las fotos de producto se ven mejor **cuadradas o verticales (4:5)**.
   - Peso ideal: **menos de 300 KB**. Podés reducirlas con [squoosh.app](https://squoosh.app) (gratis, en el navegador).
2. Nombrá el archivo **en minúsculas, sin espacios, sin tildes ni ñ**, usando guiones: `tote-bag-girasoles.jpg` ✅ / `Tote Bag Girasoles (1).JPG` ❌.
3. Copiala en la carpeta que corresponda:
   - Productos → `public/imagenes/productos/`
   - Servicios → `public/imagenes/servicios/`
   - Logos de empresas asociadas → `public/imagenes/asociadas/` (creá la carpeta si no existe)
4. Escribí su ruta en el archivo de contenido como se explica en [A4](#a4-cambiar-una-fotografía).

> ⚠️ En Vercel **las mayúsculas importan**: si el archivo se llama `Agenda.jpg` y escribís `agenda.jpg`, en tu compu puede funcionar pero en el sitio publicado no. Por eso conviene usar siempre minúsculas.

Las fotos del collage del inicio se cambian en `src/contenido/textosSitio.js`, en `heroImagenes`.

## A6. Modificar un precio

En el archivo de su categoría, cada producto tiene dos datos de precio:

```js
    precio: null,
    tipoPrecio: "consultar",
```

| Querés mostrar…          | Escribí                                       | En el carrito…                                  |
| ------------------------ | --------------------------------------------- | ----------------------------------------------- |
| `$ 8.500`                | `precio: 8500,` y `tipoPrecio: "fijo",`       | se suma al subtotal                             |
| `Desde $ 8.500`          | `precio: 8500,` y `tipoPrecio: "desde",`      | queda "Precio a confirmar" (no se suma)         |
| `Consultar precio`       | `precio: null,` y `tipoPrecio: "consultar",`  | queda "Precio a confirmar"                      |

Reglas:

- El número va **sin `$`, sin puntos y sin comillas**: `8500`, no `"$8.500"`.
- Para centavos usá punto: `8500.50`.
- El formato `$ 8.500` en pesos argentinos se arma solo.
- Si te olvidás el precio, el sitio muestra "Consultar precio". Nunca muestra `$0`.
- El precio se usa **solo para el "Modelo del catálogo"**. Lo personalizado siempre queda **"a cotizar"**, aunque el modelo tenga precio.

**Ejemplo.** Publicar la tote bag a $8.500:

```js
    idProducto: "tote-bags-estampadas",
    …
    precio: 8500,
    tipoPrecio: "fijo",
```

## A7. Marcar productos como destacados

En el archivo de su categoría, cambiá `productoDestacado: false` por `productoDestacado: true`.

En el inicio se muestran los primeros **6** destacados, ordenados por su número de `orden`. El primero se ve más grande, así que conviene que tenga una foto linda y de buena calidad.

## A8. Producto del catálogo, personalizable o ambos

Cada producto puede venderse de tres maneras, según dos datos:

| Caso                                                           | `permiteCompraEstandar` | `permitePersonalizacion` | Qué ve el cliente                                                            |
| -------------------------------------------------------------- | ----------------------- | ------------------------ | ---------------------------------------------------------------------------- |
| **Solo modelo del catálogo** (diseño de LENA, tal cual se ve)  | `true`                  | `false`                  | Botón "Agregar al carrito", con el precio publicado                          |
| **Solo a medida** (sin precio publicado)                       | `false`                 | `true`                   | Formulario y botón "Solicitar a medida", queda "a cotizar"                   |
| **Ambas**                                                      | `true`                  | `true`                   | Selector "Modelo del catálogo / Personalizado" y botón "Personalizar este producto" |

**Variantes del modelo del catálogo.** Si el modelo estándar tiene opciones para elegir (formato, talle, tipo), se cargan así:

```js
    variantes: { etiqueta: "Formato", opciones: ["Diaria", "Semanal", "Laboral"] },
```

Si no tiene opciones: `variantes: null,`

**Cantidades.** `cantidadMinima` y `cantidadMaxima` limitan cuántas unidades se pueden pedir.

## A9. Editar las preguntas de personalización

Las preguntas que se hacen al personalizar están en `src/contenido/personalizaciones.js`, agrupadas en formularios: `general`, `textil`, `packaging`, `papeleria`, `eventos`, `granFormato`, `regalos` (fechas especiales) y `diseno` (para servicios).

Cada producto elige su formulario en su archivo de la carpeta `productos/`:

```js
    formularioPersonalizacion: "textil",
```

**Agregar una pregunta.** Copiá este bloque dentro de la lista del formulario que quieras (entre sus `[` `]`):

```js
    {
      idCampo: "tipografia",
      etiqueta: "Tipografía preferida",
      tipo: "seleccion",
      opciones: ["Manuscrita", "Moderna", "Clásica", "Que la elija LENA"],
      obligatorio: false,
    },
```

- `tipo` puede ser `"texto"` (una línea), `"textoLargo"` (varias líneas), `"seleccion"` (lista de opciones) o `"fecha"`.
- `obligatorio: true` obliga a completarla antes de agregar al carrito.
- `etiquetaCorta` (opcional) es cómo se ve ese dato en el carrito y en el mensaje de WhatsApp.

**Crear un formulario nuevo.** Copiá uno existente, cambiale el nombre (ej: `tazas: [ … ],`) y usalo en el producto con `formularioPersonalizacion: "tazas",`.

> **Sobre los archivos de referencia (logos, fotos):** WhatsApp no permite adjuntar archivos automáticamente desde un enlace. Por eso el sitio **no tiene un botón para subir archivos**: le avisa al cliente que los mande en el chat después de enviar el pedido. Esto se activa con `aceptaArchivosReferencia: true` en el producto.

## A10. Cambiar los colores y las tipografías

Abrí `src/contenido/coloresTema.js`. Cada color está en formato hexadecimal (`"#F27825"`), igual que en Illustrator, Figma o Canva:

```js
  naranja: "#F27825",      // acento principal
  lavanda: "#8175B0",      // acento secundario
  fondo: "#FBFAF7",        // fondo general
  tinta: "#1E1D1B",        // textos
```

Cambiá el código y guardá. Al lado de cada color hay un comentario que explica dónde se usa.

> 💡 Los colores "oscuro" (`naranjaOscuro`, `lavandaOscuro`) se usan para textos chicos. Si los cambiás, asegurate de que se lean bien sobre fondo blanco. Podés verificar el contraste en [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/).

**Tipografías.** Para cambiarlas:

1. Elegí las fuentes en [fonts.google.com](https://fonts.google.com) y tocá "Get embed code".
2. Copiá la dirección que empieza con `https://fonts.googleapis.com/css2?…` y pegala en `direccionGoogleFonts`.
3. Cambiá los nombres en `titulos` y `textos`, respetando las comillas simples: `"'Nombre De La Fuente', sans-serif"`.

## A11. Modificar textos

Todos los títulos, bajadas y botones están en `src/contenido/textosSitio.js`, ordenados por página (`inicio`, `catalogo`, `servicios`, `contacto`, `carrito`, etc.).

Ejemplo: cambiar el título grande del inicio.

```js
    heroTitulo: "Diseño que se puede tocar.",
```

Los textos del carrito y del mensaje de WhatsApp (saludo inicial, despedida, "Precio a cotizar…") están en `src/contenido/configuracionPedidos.js`.

El menú de navegación está en `src/contenido/navegacion.js`.

## A12. Cambiar los enlaces de redes sociales

Abrí `src/contenido/redesSociales.js` y pegá la dirección completa del perfil en `enlace`:

```js
  {
    idRed: "instagram",
    nombre: "Instagram",
    usuario: "@lena.estudio",
    enlace: "https://www.instagram.com/lena.estudio/",
    icono: "instagram",
  },
```

- Si `enlace` queda vacío (`""`), esa red **no se muestra**. Así nunca hay botones que no llevan a ningún lado.
- Para agregar otra red, copiá un bloque. El `icono` puede ser `"instagram"`, `"pinterest"`, `"whatsapp"`, `"email"` o `"enlace"` (genérico).

> ⚠️ El Instagram de Push (`pushagenciacc`) es de la empresa asociada. Está en `empresasAsociadas.js` y **no** debe usarse como Instagram de LENA.

## A13. Editar la información de contacto y el WhatsApp

Abrí `src/contenido/configuracionSitio.js`, sección `contacto`:

```js
  contacto: {
    whatsapp: "5492211234567",
    email: "hola@lena.com.ar",
    ciudad: "La Plata, Buenos Aires",
    horarioAtencion: "Lunes a viernes de 9 a 18",
  },
```

**Cómo escribir el número de WhatsApp** (es el que recibe los pedidos):

- Solo números, sin `+`, espacios ni guiones.
- Empieza con `54` (Argentina) y después `9`.
- Sigue el código de área **sin el 0** y el número **sin el 15**.
- Ejemplo: `(0221) 15 123-4567` → `5492211234567`.

Mientras el número esté vacío, el botón "Enviar pedido por WhatsApp" aparece desactivado con un aviso, y se puede copiar el mensaje igual.

Los datos vacíos no se muestran en el sitio.

## A14. Agregar una nueva categoría

1. Abrí `src/contenido/categorias.js`.
2. Copiá un bloque de categoría y pegalo debajo:

```js
  {
    idCategoria: "mascotas",
    nombre: "Mascotas",
    descripcion: "Chapitas, bandanas y accesorios con nombre.",
    ilustracion: "estrella",
    orden: 110,
    mostrarCategoria: true,
    productosPorHabilitar: [],
  },
```

3. En los archivos de `src/contenido/productos/`, agregá `"mascotas"` a las `categorias` de los productos que correspondan:

```js
    categorias: ["merch-regalos", "mascotas"],
```

Un producto puede estar en varias categorías sin duplicarse. **Una categoría sin productos visibles no aparece** en los filtros.

`ilustracion` es el dibujo que se usa cuando un producto no tiene foto: `"papel"`, `"caja"`, `"remera"`, `"bolsa"`, `"regalo"`, `"evento"`, `"cartel"`, `"negocio"`, `"cuadro"`, `"cuaderno"` o `"estrella"`.

## A15. Editar los servicios creativos

En `src/contenido/servicios.js` está cada servicio (Branding, Diseño gráfico, etc.). Se edita igual que los productos: `nombre`, `descripcion`, la lista `incluye` y la `imagen`.

- `disponibilidad: "consultar"` muestra la etiqueta "Consultá disponibilidad". Hoy la tiene Producción Audiovisual, porque esos servicios todavía no están confirmados.
- `permiteSolicitarPresupuesto: true` permite sumar el servicio al pedido, siempre como "a cotizar".
- `nota` y `enlaceNota` muestran una aclaración con enlace. Por ejemplo, que el desarrollo web lo realiza Valero IT.

## A16. Agregar una empresa asociada

En `src/contenido/empresasAsociadas.js`, copiá un bloque:

```js
  {
    idEmpresa: "imprenta-amiga",
    nombre: "Imprenta Amiga",
    categoria: "Impresión offset",
    descripcion: "Grandes tiradas de impresos con terminaciones especiales.",
    estado: "proximamente",
    sitioWeb: "",
    instagram: "",
    logo: "",
    colorAcento: "lavanda",
    mostrarEmpresa: true,
    orden: 40,
  },
```

Su página se crea sola en `/otros-servicios/imprenta-amiga`.

- `estado: "proximamente"` muestra la etiqueta "Próximamente". Cuando la empresa tenga su información lista, cambialo a `"activo"`.
- Cuando tengas el **sitio oficial**, pegalo en `sitioWeb` y aparece el botón "Visitar sitio web".
- `logo` es opcional: copiá el logo en `public/imagenes/asociadas/` y escribí su ruta. Si queda vacío, se usa la inicial de la empresa.

## A17. Cómo funciona el carrito y el envío por WhatsApp

1. El cliente elige un producto y lo suma al pedido de una de dos maneras:
   - como **modelo del catálogo**, con el precio publicado si existe, o
   - **personalizado**, completando el formulario. Queda "a cotizar".
2. Puede sumar varios productos, cambiar cantidades, quitar productos o **editar** una personalización desde el carrito (ícono de la bolsa, arriba a la derecha).
3. El carrito se guarda en el navegador del cliente: si recarga o cierra la pestaña, lo recupera.
4. En **Finalizar pedido** revisa todo, puede escribir su nombre y comentarios, y toca **"Enviar pedido por WhatsApp"**.
5. Se abre WhatsApp con el mensaje armado. **El pedido le llega a LENA recién cuando el cliente toca "Enviar" en WhatsApp.** El sitio no confirma ni registra pedidos por su cuenta.
6. Si el pedido es muy largo, el sitio ofrece **copiar el mensaje** para pegarlo a mano en el chat.

Reglas de precios:

- Lo que tiene precio fijo se suma al **subtotal**.
- Lo personalizado y lo que no tiene precio queda **pendiente de cotización** y nunca se cuenta como $0.
- Si hay algo pendiente, el total dice **"A confirmar por WhatsApp"**.

Ejemplo del mensaje que recibe LENA:

```
¡Hola LENA! 👋 Quisiera consultar por el siguiente pedido:

*1. Tote bags estampadas*
- Modalidad: Producto del catálogo
- Cantidad: 2
- Precio unitario: $ 8.500
- Subtotal: $ 17.000

*2. Remeras estampadas*
- Modalidad: Personalizado
- Cantidad: 3
- Personalización: Logo de mi emprendimiento en el frente
- Talle: M
- Color de la prenda o tela: Negro
- Precio: A cotizar

*Resumen*
- Subtotal de productos con precio: $ 17.000
- Productos pendientes de cotización: 1
- Total definitivo: A confirmar

*Nombre:* Cintia

Te envío a continuación las imágenes o archivos de referencia.
Quedo a la espera de la cotización y confirmación. ¡Gracias!
```

---

# Parte B · Tareas técnicas

## B1. Programas que hay que instalar

| Programa                        | Para qué sirve                                         | Dónde descargarlo                                              |
| ------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| **Node.js** (versión LTS)       | Hace funcionar el sitio en tu computadora              | [nodejs.org](https://nodejs.org)                               |
| **Visual Studio Code**          | Editor para abrir y modificar los archivos             | [code.visualstudio.com](https://code.visualstudio.com)         |
| **GitHub Desktop** (recomendado) | Subir los cambios a GitHub sin escribir comandos       | [desktop.github.com](https://desktop.github.com)               |

También vas a necesitar una cuenta gratuita en [github.com](https://github.com) y otra en [vercel.com](https://vercel.com). En Vercel podés registrarte directamente con tu cuenta de GitHub.

## B2. Instalar Node.js

1. Entrá a [nodejs.org](https://nodejs.org) y descargá la versión que dice **LTS**.
2. Abrí el archivo descargado (`.msi`) y tocá **Next** en todas las pantallas, dejando las opciones como vienen.
3. Al terminar, **reiniciá la computadora** (o al menos cerrá y volvé a abrir Visual Studio Code).
4. Para comprobar que quedó instalado, abrí una terminal (ver [B5](#b5-abrir-una-terminal-dentro-del-editor)) y escribí:

```bash
node -v
```

Si aparece un número como `v24.x.x` o `v22.x.x`, está todo bien. Se necesita la versión 20.19 o superior.

## B3. Guardar la carpeta del proyecto en Documentos

1. Hacé clic derecho sobre el archivo `.zip` y elegí **Extraer todo…**
2. Elegí como destino `C:\Users\TU_USUARIO\Documents` (la carpeta **Documentos**).
3. Vas a tener la carpeta `Documentos\lena-estudio-creativo`.

> ⚠️ Evitá guardar el proyecto en OneDrive, en el Escritorio sincronizado o en carpetas con nombres muy largos. Documentos está bien.

## B4. Abrir el proyecto con Visual Studio Code

1. Abrí **Visual Studio Code**.
2. Menú **File → Open Folder…** (en español: **Archivo → Abrir carpeta…**).
3. Elegí `Documentos\lena-estudio-creativo` y tocá **Seleccionar carpeta**.
4. Si pregunta "¿Confiás en los autores de los archivos?", tocá **Sí, confío**.
5. A la izquierda vas a ver todos los archivos. Hacé clic en uno para abrirlo.

## B5. Abrir una terminal dentro del editor

La terminal es una ventana donde se escriben comandos.

1. En Visual Studio Code: menú **Terminal → New Terminal** (**Terminal → Nuevo terminal**). También funciona el atajo `` Ctrl + ` `` (la tecla a la izquierda del 1).
2. Abajo se abre un panel. Ahí vas a escribir los comandos y confirmar cada uno con **Enter**.
3. Comprobá que la terminal esté "parada" en la carpeta del proyecto: la línea debería terminar en `lena-estudio-creativo>`.

## B6. Instalar las dependencias

**Solo se hace la primera vez**, o cuando alguien agrega una librería nueva. En la terminal, escribí:

```bash
npm install
```

**Qué hace:** descarga las herramientas que el sitio necesita (React, Vite, etc.) y las guarda en una carpeta `node_modules`. Tarda uno o dos minutos. Puede mostrar avisos en amarillo: es normal.

## B7. Iniciar el sitio en modo desarrollo

```bash
npm run dev
```

**Qué hace:** arranca una copia del sitio que funciona solo en tu computadora. Cada vez que guardás un archivo, el sitio se actualiza solo.

Vas a ver algo así:

```
  VITE v8.x  ready in 300 ms
  ➜  Local:   http://localhost:5173/
```

**Mientras trabajes, dejá esa terminal abierta.**

## B8. Abrirlo en el navegador

Normalmente se abre solo. Si no, abrí Chrome o Edge y escribí en la barra de direcciones:

```
http://localhost:5173
```

Ahora podés editar un archivo de `src/contenido`, guardar con `Ctrl + S` y ver el cambio en el navegador al instante.

## B9. Detener el servidor local

En la terminal donde está corriendo, apretá `Ctrl + C`. Si pregunta "¿Desea terminar el trabajo por lotes (S/N)?", escribí `S` y Enter. También se detiene si cerrás Visual Studio Code.

## B10. Generar una versión lista para publicar

Vercel hace este paso solo, pero podés probarlo antes en tu computadora:

```bash
npm run build
```

**Qué hace:** arma la versión final y optimizada del sitio en la carpeta `dist`. Si hay un error en algún archivo (por ejemplo, una coma de menos), acá lo vas a ver.

Para ver esa versión final en el navegador:

```bash
npm run preview
```

Y abrí `http://localhost:4173`.

También podés comprobar que el carrito calcula bien con:

```bash
npm test
```

Tiene que terminar con `fail 0`.

## B11. Publicar el proyecto en GitHub

GitHub guarda el proyecto en internet y lleva un historial de cada cambio. Vercel lo toma desde ahí.

### Opción recomendada: con GitHub Desktop (sin comandos)

1. Abrí **GitHub Desktop** e iniciá sesión con tu cuenta de GitHub.
2. Menú **File → Add local repository…** y elegí la carpeta `Documentos\lena-estudio-creativo`.
3. Va a decir que la carpeta todavía no es un repositorio: tocá **create a repository**, dejá el nombre `lena-estudio-creativo` y tocá **Create repository**.
4. Arriba tocá **Publish repository**. Podés dejar marcado **Keep this code private** (privado). Confirmá.
5. Listo: el proyecto ya está en tu cuenta de GitHub.

### Opción con comandos (si tenés Git instalado)

Primero creá un repositorio vacío en [github.com/new](https://github.com/new) llamado `lena-estudio-creativo`, sin agregar README. Después, en la terminal:

```bash
git init
git add .
git commit -m "Primera versión del sitio de LENA"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/lena-estudio-creativo.git
git push -u origin main
```

| Comando              | Qué hace                                                   |
| -------------------- | ---------------------------------------------------------- |
| `git init`           | Empieza a llevar el historial de la carpeta                |
| `git add .`          | Marca todos los archivos para guardar                      |
| `git commit -m "…"`  | Guarda una "foto" de los cambios con una descripción       |
| `git remote add …`   | Conecta la carpeta con tu repositorio de GitHub            |
| `git push`           | Sube los cambios a GitHub                                  |

> La carpeta `node_modules` y la carpeta `dist` **no se suben**. Lo indica el archivo `.gitignore` y está bien que sea así.

## B12. Conectar GitHub con Vercel

1. Entrá a [vercel.com](https://vercel.com) y registrate con **Continue with GitHub**.
2. Tocá **Add New… → Project**.
3. Buscá `lena-estudio-creativo` en la lista y tocá **Import**. Si no aparece, tocá **Adjust GitHub App Permissions** y dale acceso a ese repositorio.
4. Vercel detecta solo que es un proyecto **Vite**. No cambies nada:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Tocá **Deploy** y esperá uno o dos minutos.
6. Te va a dar una dirección del tipo `https://lena-estudio-creativo.vercel.app`. ¡Ese es el sitio publicado!

**Después de publicar por primera vez:**

1. Copiá la dirección que te dio Vercel.
2. Pegala en `src/contenido/configuracionSitio.js` en `urlPublica`, **sin barra al final**:

```js
  urlPublica: "https://lena-estudio-creativo.vercel.app",
```

3. Guardá y subí el cambio (ver B13). Con eso se genera el `sitemap.xml` para Google y se completan los datos para compartir el link.

> 💡 Si más adelante compran un dominio propio (por ejemplo `lena.com.ar`), se conecta en Vercel desde **Settings → Domains**. Después actualizá `urlPublica` con ese dominio.

## B13. Actualizar el sitio publicado después de hacer cambios

Cada vez que subís cambios a GitHub, **Vercel vuelve a publicar el sitio solo**, en uno o dos minutos.

### Con GitHub Desktop

1. Hacé los cambios y guardalos en Visual Studio Code.
2. Abrí GitHub Desktop: a la izquierda vas a ver los archivos modificados.
3. Abajo a la izquierda, en **Summary**, escribí una descripción corta. Por ejemplo: `Nuevo precio de tote bags`.
4. Tocá **Commit to main**.
5. Tocá **Push origin** (arriba).
6. Esperá un par de minutos y recargá el sitio.

### Con comandos

```bash
git add .
git commit -m "Nuevo precio de tote bags"
git push
```

> 💡 Antes de subir, conviene probar con `npm run dev` que todo se vea bien. Si en Vercel la publicación falla, el sitio anterior sigue funcionando: no se rompe nada.

## B14. Resolver errores frecuentes

| Problema                                                                                          | Solución                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'npm' no se reconoce como un comando…`                                                           | Node.js no está instalado o falta reiniciar. Instalalo (B2) y **cerrá y abrí** Visual Studio Code.                                                                                                                                                      |
| `npm.ps1 no se puede cargar porque la ejecución de scripts está deshabilitada`                     | Es una restricción de PowerShell en Windows. Opción 1: en la terminal, tocá la flecha ⌄ junto al `+` y elegí **Command Prompt**. Opción 2: ejecutá una sola vez `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` y respondé `S`. |
| La página queda en blanco                                                                         | Casi siempre es una coma, comilla o llave de menos en un archivo de `src/contenido`. Mirá la terminal donde corre `npm run dev`: el error indica el archivo y el número de línea. Usá `Ctrl + Z` para volver atrás.                                    |
| `Unexpected token` / `Expected ","`                                                               | Falta una coma o una comilla en la línea que indica el error (o en la anterior).                                                                                                                                                                        |
| La foto no aparece (se ve el dibujo de respaldo)                                                  | Revisá que el nombre del archivo y la ruta coincidan **exactamente**, con mayúsculas y extensión (`.jpg` vs `.jpeg`), y que la ruta empiece con `/imagenes/…`.                                                                                       |
| `Port 5173 is in use`                                                                             | Ya hay otra copia corriendo. Cerrá las otras terminales o usá la dirección nueva que indica Vite.                                                                                                                                                      |
| El botón de WhatsApp está gris                                                                    | Falta el número en `configuracionSitio.js` (A13).                                                                                                                                                                                                       |
| WhatsApp se abre pero sin el mensaje                                                              | El pedido era muy largo. Usá el botón **Copiar mensaje** y pegalo en el chat.                                                                                                                                                                          |
| Un producto aparece como "ya no está disponible" en el carrito                                    | Se ocultó o se cambió su `idProducto`. El cliente tiene que quitarlo y volver a agregarlo.                                                                                                                                                              |
| En Vercel falla la publicación ("Build failed")                                                   | En Vercel, abrí el deploy fallido y leé el error. Suele ser el mismo problema que verías con `npm run build` en tu compu. Corregilo y volvé a subir.                                                                                                     |
| Cambié algo y en el sitio publicado no se ve                                                      | Revisá que hayas hecho **Commit** y **Push** (B13). Después recargá con `Ctrl + F5`.                                                                                                                                                                    |
| Borré `node_modules` o descargué el proyecto de nuevo                                             | Ejecutá otra vez `npm install`.                                                                                                                                                                                                                          |

---

## Antes de publicar: datos pendientes

Estos datos no estaban en el sitio anterior y **no se inventaron**. Hay que completarlos:

- [ ] **Número de WhatsApp** de LENA → `configuracionSitio.js` → `contacto.whatsapp`. Sin esto, los pedidos no se pueden enviar.
- [ ] **Instagram** y **Pinterest** de LENA → `redesSociales.js`.
- [ ] **Email**, **ciudad** y **horario** (opcionales) → `configuracionSitio.js`.
- [ ] **Precios** de los productos que se venden como modelo del catálogo → carpeta `src/contenido/productos/`. Hoy todos dicen "Consultar precio".
- [ ] **Fotos propias** para los productos que hoy muestran un dibujo (la mayoría de los nuevos: fechas especiales, tazas, mates, cuadros, etc.). También conviene reemplazar la foto de Flyers, que es una plantilla genérica con texto de relleno.
- [ ] **Revisar el catálogo ampliado**: se publicaron todos los productos posibles del rubro. Si LENA no hace alguno, ocultalo con `mostrarProducto: false` (A3).
- [ ] Confirmar qué productos se venden como **modelo del catálogo** (`permiteCompraEstandar`) y cuáles solo **a medida**.
- [ ] Confirmar la disponibilidad de **Producción Audiovisual** (hoy dice "Consultá disponibilidad").
- [ ] **Sitio oficial y logo** de Valero IT, Push y RompeHielo → `empresasAsociadas.js`.
- [ ] **`urlPublica`** después del primer despliegue en Vercel (B12).

---

## Para quien programe: arquitectura

Resumen técnico para un desarrollador que continúe el proyecto.

- **Stack:** React 19 + React Router 6 + Vite. JavaScript sin TypeScript. Sin dependencias de UI. CSS propio con variables, organizado por área en `src/estilos/`.
- **Fuente única de verdad:**
  - El catálogo (productos, categorías, servicios y empresas) vive en `src/contenido/*.js`.
  - Se normaliza en `src/logica/normalizarDatos.js`, que completa valores por defecto y valida.
  - Se accede **solo** a través de `src/logica/repositorioCatalogo.js` → `CatalogoContext`.
  - Ningún componente define nombres, precios ni imágenes.
- **Carrito:** `CarritoContext` (Context + `useReducer`) es el único estado. Cada línea guarda solo referencias y elecciones: `tipoItem`, `idItem`, `modalidad`, `cantidad`, `variante`, `personalizacion` y `observaciones`. `localStorage` (`lena-carrito`, con versión) es solo persistencia y se valida al cargar.
- **Precios:** toda la lógica está en `src/logica/precios.js`. `resumenPedido.js` combina carrito y catálogo en un único resumen. Lo consumen el panel, la página del carrito, la finalización y `mensajeWhatsapp.js`, así el mensaje refleja exactamente lo que se ve en pantalla.
- **Backend futuro:**
  - Reemplazar el cuerpo de `cargarCatalogo()` en `repositorioCatalogo.js` por llamadas `fetch` y normalizar la respuesta con las mismas funciones.
  - `construirPedidoParaApi()` en `resumenPedido.js` ya arma el cuerpo de un `POST /pedidos` (solo referencias; el servidor recalcula los precios).
  - Los precios del frontend son orientativos hasta que haya validación en el servidor.
- **SEO:** `vite.config.js` inyecta título, descripción y Open Graph en `index.html` desde `configuracionSitio.js`, y genera `robots.txt` y, si hay `urlPublica`, `sitemap.xml`. Cada página actualiza `document.title` con `useMetadatos`.
- **Vercel:** `vercel.json` reescribe todas las rutas sin extensión a `index.html`, así `/carrito`, `/finalizar-pedido` o `/catalogo/:id` funcionan al recargar o al entrar directo.
- **Pruebas:** `npm test` corre `pruebas/logica.test.js` con `node:test`. Cubre precios, agrupación de líneas, personalizaciones, totales, validación del carrito guardado y el mensaje.
