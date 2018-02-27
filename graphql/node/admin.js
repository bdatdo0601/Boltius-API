const { GraphQLObjectType, GraphQLList } = require("graphql");

const { RoleInterface, NodeInterface } = require("../interface");

const { Permission } = require("../type");
const GroupType = require("./group");

const AdminType = new GraphQLObjectType({
    name: "Admin",
    interfaces: [RoleInterface, NodeInterface],
    fields: () => ({
        id: { type: GraphQLID },
        groups: { type: new GraphQLList(GroupType) },
        permissions: { type: new GraphQLList(Permission) },
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

module.exports = AdminType;
