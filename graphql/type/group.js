import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } from "graphql";

import PermissionType from "./permission";

const GroupType = new GraphQLObjectType({
    name: "Group",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        permissions: { type: new GraphQLList(PermissionType) },
    }),
});

export default GroupType;
