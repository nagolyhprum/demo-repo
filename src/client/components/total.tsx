import React, { Component } from "react";
import { connect } from "react-redux";

import { add, sub, fetchList } from "../actions/total";

import { IState } from "../reducers";

import { getTotal } from "../reselect";

interface ITotalProps {
  total: number;
  add(): void;
  sub(): void;
  fetchList(): void;
}

class Total extends Component<ITotalProps> {
  public render() {
    return (
      <div>
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
  sub,
  fetchList
})(Total);
