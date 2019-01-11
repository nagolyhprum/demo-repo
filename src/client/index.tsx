import 'babel-polyfill';

import React from "react";
import ReactDom from "react-dom";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import Total from "./components/total";
import reducers from "./reducers";

function* gen() {
  yield* ["a", "b", "c"];
}

async function somethingElse() {
  const value = await Promise.resolve(true);
  console.log(value);
}

const store = createStore(reducers);

ReactDom.render(
  <Provider store={store}>
    <Total/>
  </Provider>,
  document.querySelector("#root"),
);
