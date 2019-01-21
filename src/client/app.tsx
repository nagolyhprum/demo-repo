import React, { Component } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import mySaga from "./sagas";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
if (process.env.NODE_ENV !== "production") {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}
const store = createStore(reducers, applyMiddleware(...middlewares));
sagaMiddleware.run(mySaga);

import { matchPath, Route, Switch, withRouter } from "react-router-dom";

import routes from "../shared/routes";

interface IAppProps {
  data: any;
  match: any;
  location: any;
  history: any;
}

interface IAppState {
  data: any;
  ready: boolean;
}

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      data : props.data && (props.data.success || props.data.error),
      ready : props.data,
    };
  }
  public componentDidMount() {
    if (!this.props.data) {
      setTimeout(() => {
        this.componentDidUpdate(null);
      }, 3000);
    }
  }
  public componentDidUpdate(prevProps: IAppProps | null) {
    const { location, match } = this.props;
    if (!prevProps || location !== prevProps.location || match !== prevProps.match) {
      this.setState({
        data : null,
      });
      const route = routes.success.find((r) => !!matchPath(location.pathname, r));
      const promise = (route && route.fetchInitialData && route.fetchInitialData(match.params)) ||
        Promise.resolve(null);
      promise.then((data: any) => {
        this.setState({
          data,
          ready : true,
        });
      });
    }
  }
  public render() {
    if (!this.state.ready) { return null; }
    return (
      <Provider store={store}>
        <Switch>
          {
            routes.success.map((route) => {
              const Path = route.component;
              return (
                <Route key={route.path || "error"} path={route.path} exact={route.exact} render={(props) => {
                  return <Path {...props} data={this.state.data} />;
                }} />
              );
            })
          }
          <Route render={(props) => {
            return <routes.error.component {...props} data={this.state.data} />;
          }} />
        </Switch>
      </Provider>
    );
  }
}

export default withRouter(App);
