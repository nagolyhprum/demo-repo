import React, { Component } from "react";

interface IHtmlProps {
  root: string;
  htmlAttributes: any;
  bodyAttributes: any;
  title: any;
  meta: any;
  link: any;
  base: any;
  noscript: any;
  script: any;
  style: any;
  data: any;
}

export default class Html extends Component<IHtmlProps> {
  public render() {
    const {
      htmlAttributes,
      bodyAttributes,
      title,
      meta,
      link,
      base,
      noscript,
      script,
      style,
    } = this.props;
    return (
      <html {...htmlAttributes}>
        <head>
          <link href="/resources/index.css" rel="stylesheet"/>
          {title}
          {meta}
          {link}
          {style}
          {base}
        </head>
        <body {...bodyAttributes}>
          {noscript}
          <div id="root" dangerouslySetInnerHTML={{
            __html : this.props.root,
          }}></div>
          <script dangerouslySetInnerHTML={{
            __html : `window.__INITIAL_DATA__=${JSON.stringify(this.props.data)}`,
          }}></script>
          <script src="/resources/index.js"></script>
          {script}
        </body>
      </html>
    );
  }
}
