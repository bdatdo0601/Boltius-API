const { GraphQLInterfaceType, GraphQLID } = require("graphql");

const NodeInterface = new GraphQLInterfaceType({
    name: "Node",
    fields: () => ({
        id: { type: GraphQLID },
    }),
});

module.exports = NodeInterface;
