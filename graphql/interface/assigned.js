import { GraphQLInterfaceType, GraphQLString } from "graphql";

import RoleInterface from "./role";

const AssignedInterface = new GraphQLInterfaceType({
    name: "Assigned",
    fields: () => ({
        createdBy: { type: RoleInterface },
        timeCreated: { type: GraphQLString },
    }),
});

export default AssignedInterface;
