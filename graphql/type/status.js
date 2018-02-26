import { GraphQLID, GraphQLString, GraphQLObjectType } from "graphql";

const StatusType = new GraphQLObjectType({
    name: "Status",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        pivot: { type: GraphQLString },
    }),
});

export default StatusType;
