const { GraphQLID, GraphQLString, GraphQLObjectType } = require("graphql");

const StatusType = new GraphQLObjectType({
    name: "Status",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        pivot: { type: GraphQLString },
    }),
});

module.exports = StatusType;
