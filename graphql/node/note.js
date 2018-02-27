const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const NoteType = new GraphQLObjectType({
    name: "Note Type",
    fields: () => ({
        id: { type: GraphQLID },
        data: { type: GraphQLString },
    }),
});

module.exports = NoteType;
