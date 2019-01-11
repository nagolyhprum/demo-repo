import 'babel-polyfill';
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import Total from "./components/total";
import reducers from "./reducers";
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));

sagaMiddleware.run(mySaga)

ReactDom.render(
  <Provider store={store}>
    <Total/>
  </Provider>,
  document.querySelector("#root"),
);
