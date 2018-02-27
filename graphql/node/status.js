const { GraphQLID, GraphQLString, GraphQLObjectType } = require("graphql");

const { NodeInterface } = require("../interface");

const StatusType = new GraphQLObjectType({
    name: "Status",
    interfaces: [NodeInterface],
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        pivot: { type: GraphQLString },
    }),
});

module.exports = StatusType;
