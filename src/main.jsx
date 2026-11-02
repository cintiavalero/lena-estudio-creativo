/* Punto de entrada de la aplicación. ⚙️ ARCHIVO TÉCNICO. */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CatalogoProvider } from "./estado/CatalogoContext.jsx";
import { CarritoProvider } from "./estado/CarritoContext.jsx";
import { aplicarTema } from "./logica/tema.js";
import "./estilos/base.css";
import "./estilos/estructura.css";
import "./estilos/inicio.css";
import "./estilos/catalogo.css";
import "./estilos/carrito.css";
import "./estilos/paginas.css";

aplicarTema();

// El sitio maneja el scroll al navegar (así el feed del inicio retoma su posición).
if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

createRoot(document.getElementById("raiz")).render(
  <StrictMode>
    <BrowserRouter>
      <CatalogoProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </CatalogoProvider>
    </BrowserRouter>
  </StrictMode>
);
