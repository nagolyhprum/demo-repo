import dotenv from "dotenv";
dotenv.config();
import app from "./app";
if (process.env.NODE_ENV === "production") {
  const awsServerlessExpress = require("aws-serverless-express");
  const server = awsServerlessExpress.createServer(app);
  exports.handler = (event: any, context: any) => {
    awsServerlessExpress.proxy(server, event, context);
  };
} else {
  const childProcess = require("child_process");
  const db = require("./db").default;
  const aws = (service: string) => new Promise((resolve) => {
    childProcess.exec(`aws ${service}`, (err: any, out: any) => {
      console.log("AWS", err, out);
      resolve();
    });
  });

  db.createTables((err: any) => {
    if (err) {
      console.log("Error creating tables: ", err);
    } else {
      console.log("Tables has been created");
    }
  });

  aws("--endpoint http://localstack:4572/ s3api create-bucket --bucket lexicon_static").then(
    () => aws("--endpoint http://localstack:4572/ s3 sync dist/client s3://lexicon_static"),
  );

  app.listen(80, () => {
    console.log("listening on port 80");
  });
}
