import S3 = require("aws-sdk/clients/s3");
import express from "express";
import session from "express-session";
import graphQLMiddleware from "./graphql";

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

app.get("*", (req, res, next) => {
  client.getObject({
   Bucket: "lexicon_static",
   Key: req.url.slice(1) || "index.html",
 }, (err, data) => {
    if (!err) {
      res.end(data.Body, "binary");
    } else {
      next();
    }
  });
});

app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
  secret: process.env.SESSION_SECRET,
}));

app.use("/graphql", graphQLMiddleware);

export default app;
