import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./components/ThemeProvider";
import LayoutProvider from "./components/LayoutProvider";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/anstropleuton">
      <ThemeProvider>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
