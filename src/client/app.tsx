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

import { Route, Switch, withRouter, matchPath } from "react-router-dom";

import routes from "../shared/routes";

interface IAppProps {
  data: any;
  match: any;
  location: any;
  history: any;
}

interface IAppState {
  data: any;
  usedData: boolean;
}

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      data : null,
      usedData : false,
    };
  }
  public componentDidMount() {
    const { location, match } = this.props;
    if (this.props.data && !this.state.usedData) {
      this.setState({
        data : this.props.data.success || this.props.data.error,
        usedData : true,
      });
    } else {
      this.setState({
        data : null
      });
      const route = routes.success.find(route => !!matchPath(location.pathname, route))
      const promise = (route && route.fetchInitialData && route.fetchInitialData(match.params)) || Promise.resolve(null)
      promise.then((data : any) => {
        this.setState({ data });
      })
    }
  }
  public render() {
    return (
      <Provider store={store}>
        <Switch>
          {
            routes.success.map((route) => {
              const Component = route.component;
              return (
                <Route key={route.path || "error"} path={route.path} exact={route.exact} render={(props) => {
                  return <Component {...props} data={this.state.data} />;
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

export default withRouter(App)
