const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = require("graphql");

const PermissionType = require("./permission");

const GroupType = new GraphQLObjectType({
    name: "Group",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        permissions: { type: new GraphQLList(PermissionType) },
    }),
});

module.exports = GroupType;
