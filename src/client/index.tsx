import React from "react";
import ReactDom from "react-dom";

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

import reducers from 'reducers'
import Total from 'components/total'

const store = createStore(reducers)

ReactDom.render(
  <Provider store={store}>
    <Total/>
  </Provider>,
  document.querySelector("#root"),
);
