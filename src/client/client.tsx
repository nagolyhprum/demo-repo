import { GraphQLClient } from "graphql-request";
import url from "url";

const resolve = (path: string) => url.resolve(typeof window === "undefined" ? "http://localhost:8080" : "", path);
const graphql = resolve("/graphql");

const client = new GraphQLClient(graphql, {
 credentials: "include",
});

export default (query: string, variables: any = null) => client.request(query, variables);
