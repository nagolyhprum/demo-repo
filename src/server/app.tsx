import S3 = require("aws-sdk/clients/s3");
import connectRedis from "connect-redis";
import express, { Request, Response } from "express";
import session from "express-session";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  Helmet,
} from "react-helmet";
import { matchPath } from "react-router";
import { StaticRouter } from "react-router-dom";
import App from "../client/app";
import routes from "../shared/routes";
import db from "./db";
import graphQLMiddleware from "./graphql";
import Html from "./html";

const RedisStore = connectRedis(session);

const client = new S3({
  accessKeyId: "your s3 key",
  apiVersion: "2006-03-01",
  endpoint: "http://localstack:4572",
  secretAccessKey: "your s3 secret",
});

declare const process: {
  env: {
    NODE_ENV: string,
    SESSION_SECRET: string,
  },
};

const app = express();

app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({
    host : "redis",
    port : 6379,
  }),
}));

app.use((req, _, next) => {
  req.db = db;
  next();
});

app.use("/graphql", graphQLMiddleware);

app.get("/resources/*", (req, res, next) => {
  const file = req.path.split("/").pop();
  client.getObject({
   Bucket: "lexicon_static",
   Key: file || "index.html",
 }, (err, data) => {
    if (!err) {
      res.end(data.Body, "binary");
    } else {
      next(err);
    }
  });
});

app.get("*", (req, res) => {
  const route = routes.success.find((route) => !!matchPath(req.path, route)) || routes.error;
  const match = matchPath(req.path, route) || { params : {} };
  const promise = (route && route.fetchInitialData && route.fetchInitialData(match.params)) || Promise.resolve(null);
  promise.then((data: any) => {
    useData(req, res, {
      success : data,
    });
  }).catch((error: any) => {
    useData(req, res, {
      error : error.message,
    });
  });
});

const useData = (req: Request, res: Response, data: any) => {
  const root = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App data={data}/>
    </StaticRouter>,
  );
  const helmet = Helmet.renderStatic();
  res.send(ReactDOMServer.renderToStaticMarkup(
    <Html
      data={data}
      base={helmet.base.toComponent()}
      script={helmet.script.toComponent()}
      noscript={helmet.noscript.toComponent()}
      style={helmet.style.toComponent()}
      htmlAttributes={helmet.htmlAttributes.toComponent()}
      bodyAttributes={helmet.bodyAttributes.toComponent()}
      title={helmet.title.toComponent()}
      meta={helmet.meta.toComponent()}
      link={helmet.link.toComponent()}
      root={root}
    />,
  ));
};

export default app;
