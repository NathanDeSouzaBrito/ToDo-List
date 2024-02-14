import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/section/Header";
import Tasks from "./components/section/Tasks";
import "./global.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <Tasks />
  </React.StrictMode>
);
