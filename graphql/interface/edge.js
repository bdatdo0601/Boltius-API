const { GraphQLInterfaceType, GraphQLString } = require("graphql");

const NodeInterface = require("./node");

const EdgeInterface = new GraphQLInterfaceType({
    name: "Node",
    fields: () => ({
        cursor: { type: GraphQLString },
        node: { type: NodeInterface },
    }),
});

module.exports = EdgeInterface;
