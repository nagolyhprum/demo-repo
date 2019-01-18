import React, { Component } from "react";
import { connect } from "react-redux";

import { add } from "../actions/total";

import { IState } from "../reducers";

import {
  Helmet,
} from "react-helmet";
import { getTotal } from "../reselect";

interface ILanguagesProps {
  data: any;
}

class Languages extends Component<ILanguagesProps> {
  public render() {
    const languages = this.props.data;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        {
          languages.map((language: any) => {
            return (
              <div key={language.name}>{language.name}</div>
            );
          })
        }
      </div>
    );
  }
}

export default connect((state: IState) => ({
  total : getTotal(state),
}), {
  add,
})(Languages);
