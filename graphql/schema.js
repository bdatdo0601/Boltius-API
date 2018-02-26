import { GraphQLSchema } from "graphql";

import Queries from "./queries";

module.exports = new GraphQLSchema({
    query: Queries,
});
