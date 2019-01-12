import graphqlHTTP from "express-graphql";

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "world";
        },
      },
    },
    name: "RootQueryType",
  }),
});

export default graphqlHTTP({
  graphiql: true,
  schema,
});
