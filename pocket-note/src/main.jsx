import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";
import GroupContextProvider from "./context/GroupContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GroupContextProvider>
        <App />
      </GroupContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
