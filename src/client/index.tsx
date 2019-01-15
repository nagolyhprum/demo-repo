import "babel-polyfill";
import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./index.scss";

declare const window: {
  __INITIAL_DATA__: any,
};

ReactDom.hydrate(
  <BrowserRouter>
    <App data={window.__INITIAL_DATA__}/>
  </BrowserRouter>,
  document.querySelector("#root"),
);
