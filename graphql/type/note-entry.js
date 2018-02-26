import { GraphQLObjectType, GraphQLString } from "graphql";

const AdminNoteType = new GraphQLObjectType({
    name: "Admin Note Type",
    fields: () => ({
        id: { type: GraphQLID },
        data: { type: GraphQLString },
        createdBy: { type: AdminType },
        timeCreated: { type: GraphQLString },
    }),
});

export default AdminNoteType;
