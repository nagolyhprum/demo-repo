import child_process from "child_process";
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

  const aws = (service: string) => new Promise((resolve) => {
    child_process.exec(`aws ${service}`, (err, out) => {
      console.log("AWS", err, out);
      resolve();
    });
  });

  aws("--endpoint http://localstack:4572/ s3api create-bucket --bucket lexicon_static").then(
    () => aws("--endpoint http://localstack:4572/ s3 sync dist/client s3://lexicon_static"),
  );

  app.listen(80, () => {
    console.log("listening on port 80");
  });
}
