import express from "express";
import session from "express-session";
import path from "path";
import graphQLMiddleware from "./graphql";

const app = express();

app.use(express.static(path.resolve(__dirname, "../client")));

app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
  secret: "keyboard cat",
}));

app.use("/graphql", graphQLMiddleware);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
