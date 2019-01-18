import client from "../client/client";
import Languages from "../client/components/languages";

export interface ILanguage {
  name : string;
}

interface IQuery {
  getLanguages : Array<ILanguage>
}

interface IRoute {
  component : any,
  exact? : boolean,
  fetchInitialData? : (params : any) => Promise<any>,
  path? : string
}

export default {
  error : {
    component: Languages,
    exact: true,
    fetchInitialData: () => Promise.resolve([]),
  } as IRoute,
  success : [{
    component: Languages,
    exact: true,
    fetchInitialData: () => client(`
      {
        getLanguages {
          name
        }
      }
    `).then((it) => (it as IQuery).getLanguages),
    path: "/",
  }] as Array<IRoute>,
};
