import { GraphQLInterfaceType, GraphQLString, GraphQLID } from "graphql";

import UserType from "../type/user";

const RoleInterface = new GraphQLInterfaceType({
    name: "Role",
    fields: () => ({
        id: { type: GraphQLID },
        fullName: {
            type: new GraphQLObjectType({
                fields: () => ({
                    first: { type: GraphQLString },
                    middle: { type: GraphQLString },
                    last: { type: GraphQLString },
                }),
            }),
        },
        user: { type: UserType },
        timeCreated: { type: GraphQLString },
    }),
});

export default RoleInterface;
