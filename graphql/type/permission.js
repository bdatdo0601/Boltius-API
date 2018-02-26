import { GraphQLBoolean, GraphQLString } from "graphql";

const PermissionType = new GraphQLObjectType({
    name: "Admin Permission",
    fields: () => ({
        permissionName: { type: GraphQLString },
        isPermitted: { type: GraphQLBoolean },
    }),
});

export default PermissionType;
