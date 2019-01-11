import React from "react";
import ReactDom from "react-dom";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import Total from "./components/total";
import reducers from "./reducers";

const store = createStore(reducers);

ReactDom.render(
  <Provider store={store}>
    <Total/>
  </Provider>,
  document.querySelector("#root"),
);
