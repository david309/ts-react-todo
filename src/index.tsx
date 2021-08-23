import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App
      headerText="Todo List"
      subHeading="A Simple Todo Application Made Using React & TypeScript"
    />
  </React.StrictMode>,
  document.getElementById("root")
);
