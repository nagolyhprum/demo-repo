import dotenv from "dotenv";
dotenv.config();
import S3 = require("aws-sdk/clients/s3");
import express from "express";
import path from "path";
import app from "./app";
if (process.env.NODE_ENV === "production") {
  const client = new S3({
    accessKeyId: "your s3 key",
    apiVersion: "2006-03-01",
    endpoint: "http://localstack:4572",
    secretAccessKey: "your s3 secret",
  });
  const awsServerlessExpress = require("aws-serverless-express");
  const server = awsServerlessExpress.createServer(app((req, res, next) => {
    const file = req.path.split("/").pop();
    client.getObject({
     Bucket: "lexicon_static",
     Key: file || "index.html",
   }, (err, data) => {
      if (!err) {
        res.end(data.Body, "binary");
      } else {
        next();
      }
    });
  }));
  exports.handler = (event: any, context: any) => {
    awsServerlessExpress.proxy(server, event, context);
  };
} else {
  const db = require("./db").default;

  db.createTables((err: any) => {
    if (err) {
      console.log("Error creating tables: ", err);
    } else {
      console.log("Tables has been created");
    }
  });

  app(express.static(path.resolve(__dirname, "../client"))).listen(8080, () => {
    console.log("listening on port 8080");
  });
}
