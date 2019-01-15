import React, { Component } from "react";
import { connect } from "react-redux";

import { add, fetchList, sub } from "../actions/total";

import { IState } from "../reducers";

import {
  Helmet,
} from "react-helmet";
import { getTotal } from "../reselect";

interface ITotalProps {
  data: any;
  total: number;
  add(): void;
  fetchList(): void;
  sub(): void;
}

class Total extends Component<ITotalProps> {
  public render() {
    console.log(this.props.data)
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        <button onClick={this.props.sub}>-</button>
        <span>{this.props.total}</span>
        <button onClick={this.props.add}>+</button>

        <button onClick={this.props.fetchList}>Load List</button>
      </div>
    );
  }
}

export default connect((state: IState) => ({
  total : getTotal(state),
}), {
  add,
  fetchList,
  sub,
})(Total);
