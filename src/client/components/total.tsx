import { connect } from 'react-redux'
import React, { Component } from 'react'

import { add, sub } from 'actions/total'

class Total extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.sub}>-</button>
        <span>{this.props.total}</span>
        <button onClick={this.props.add}>+</button>
      </div>
    )
  }
}

export default connect(({
  total
}) => ({
  total
}), {
  add,
  sub
})(Total)