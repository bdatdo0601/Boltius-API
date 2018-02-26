import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLBoolean } from "graphql";

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        isActive: { type: GraphQLBoolean },
        roles: { type: new GraphQLList(GraphQLString) },
        timeCreated: { type: GraphQLString },
    }),
});

export default UserType;
