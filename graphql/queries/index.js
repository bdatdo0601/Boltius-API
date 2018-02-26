import { GraphQLObjectType } from "graphql";
import UserQuery from "./user";

export default new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        ...UserQuery,
    }),
});
