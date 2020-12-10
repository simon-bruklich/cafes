import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Reject IE
if (window.MSCompatibleInfo != null) {
  const msg = "Internet Explorer is not supported; please use a modern browser";
  alert(msg);
  throw new Error(msg);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
