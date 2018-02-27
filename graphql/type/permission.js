const { GraphQLBoolean, GraphQLString } = require("graphql");

const PermissionType = new GraphQLObjectType({
    name: "Admin Permission",
    fields: () => ({
        permissionName: { type: GraphQLString },
        isPermitted: { type: GraphQLBoolean },
    }),
});

module.exports = PermissionType;
