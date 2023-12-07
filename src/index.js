import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MainContextProvider } from "./context/MainContext";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <MainContextProvider>
          <App />
        </MainContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
