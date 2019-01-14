import expressGraphQL from "express-graphql";

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const schema = new GraphQLSchema({
  mutation: new GraphQLObjectType({
    fields: {
      hello: {
        args: {
          value : {
            type : GraphQLString,
          },
        },
        resolve(_1, args, context) {
          const oldValue = context.session.value;
          context.session.value = args.value;
          return oldValue;
        },
        type: GraphQLString,
      },
    },
    name: "RootMutationType",
  }),
  query: new GraphQLObjectType({
    fields: {
      hello: {
        type: GraphQLString,
        resolve(_1, _2, context) {
          return context.session.value;
        },
      },
    },
    name: "RootQueryType",
  }),
});

export default expressGraphQL({
  graphiql: true,
  schema,
});
