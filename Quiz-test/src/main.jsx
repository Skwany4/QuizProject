import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render( // Renderowanie aplikacji React
  // Użycie React.StrictMode do wykrywania potencjalnych problemów w aplikacji
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
