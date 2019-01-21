import expressGraphQL from "express-graphql";

import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import {
  ILanguage,
} from "../../shared/routes";

interface IItem<E> {
  attrs: E;
}

interface IAWS<E> {
  Items: Array<IItem<E>>;
}

import {
  Language,
} from "../db";

const LanguageGQL = new GraphQLObjectType({
  fields : {
    name : {
      type : new GraphQLNonNull(GraphQLString),
    },
  },
  name : "Language",
});

const schema = new GraphQLSchema({
  mutation: new GraphQLObjectType({
    fields: {
      addLanuage: {
        args : {
          name : {
            type : new GraphQLNonNull(GraphQLString),
          },
        },
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve(_1, args) {
          return new Promise((resolve, reject) => {
            Language.create({
              name : args.name,
            }, (err: Error) => {
              err ? reject(err) : resolve(true);
            });
          });
        },
      },
    },
    name: "RootMutationType",
  }),
  query: new GraphQLObjectType({
    fields: {
      getLanguages: {
        async resolve() {
          return new Promise((resolve, reject) => {
            Language.scan().attributes(["name"]).exec((err: Error, data: IAWS<ILanguage>) => {
              err ? reject(err) : resolve(data.Items.map((it: IItem<ILanguage>) => it.attrs));
            });
          });
        },
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(LanguageGQL))),
      },
    },
    name: "RootQueryType",
  }),
});

export default expressGraphQL({
  graphiql: true,
  schema,
});
