import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const NoteType = new GraphQLObjectType({
    name: "Admin Note Type",
    fields: () => ({
        id: { type: GraphQLID },
        data: { type: GraphQLString },
    }),
});

export default NoteType;
