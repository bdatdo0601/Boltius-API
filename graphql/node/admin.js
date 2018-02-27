const { GraphQLObjectType, GraphQLList } = require("graphql");

const RoleInterface = require("./interface/role");

const PermissionType = require("./permission");
const GroupType = require("./group");

const AdminType = new GraphQLObjectType({
    name: "Admin",
    interfaces: [RoleInterface],
    fields: () => ({
        groups: { type: new GraphQLList(GroupType) },
        permissions: { type: new GraphQLList(PermissionType) },
    }),
});

module.exports = AdminType;
