import url from "url";
import Total from "../client/components/total";
const resolve = (path: string) => url.resolve("http://localhost", path);
const graphql = resolve("/graphql");

console.log(graphql);

export default {
  success : [{
    path: "/",
    exact: true,
    component: Total,
    fetchInitialData: (params: any) => Promise.resolve([]),
  }, {
    path: "/abc",
    exact: true,
    component: Total,
    fetchInitialData: (params: any) => Promise.reject(new Error("Hello World")),
  }],
  error : {
    exact: true,
    component: Total,
    fetchInitialData: (params: any) => Promise.resolve([]),
  },
};
