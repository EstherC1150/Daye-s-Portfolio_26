import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/fonts.css";
// import TestPagee from "./pages/TestPagee";
// import TestPage from "./pages/TestPage";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <TestPagee /> */}
  </StrictMode>
);
