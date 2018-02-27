const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const { NodeInterface } = require("../interface");

const NoteType = new GraphQLObjectType({
    name: "Note Type",
    interface: [NodeInterface],
    fields: () => ({
        id: { type: GraphQLID },
        data: { type: GraphQLString },
    }),
});

module.exports = NoteType;
