import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } from "graphql";

const AccountType = new GraphQLObjectType({
    name: "Account",
    fields: () => ({
        id: { type: GraphQLID },
        name: {
            type: new GraphQLList({
                name: "Account's full name",
                fields: () => ({
                    first: { type: GraphQLString },
                    middle: { type: GraphQLString },
                    last: { type: GraphQLString },
                }),
            }),
        },
        timeCreated: { type: GraphQLString },
    }),
});

export default AccountType;
