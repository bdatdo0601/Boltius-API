import { GraphQLObjectType, GraphQLList } from "graphql";

import RoleInterface from "./interface/role";

import PermissionType from "./permission";
import GroupType from "./group";

const AdminType = new GraphQLObjectType({
    name: "Admin",
    interfaces: [RoleInterface],
    fields: () => ({
        groups: { type: new GraphQLList(GroupType) },
        permissions: { type: new GraphQLList(PermissionType) },
    }),
});

export default AdminType;
