const { GraphQLBoolean, GraphQLString, GraphQLObjectType } = require("graphql");

const PageInfo = new GraphQLObjectType({
    name: "Page Information",
    fields: () => ({
        hasNextPage: { type: GraphQLBoolean },
        hasPreviousPage: { type: GraphQLBoolean },
        startCursor: { type: GraphQLString },
        endCursor: { type: GraphQLString },
    }),
});

const Permission = new GraphQLObjectType({
    name: "Permission",
    fields: () => ({
        permissionName: { type: GraphQLString },
        isPermitted: { type: GraphQLBoolean },
    }),
});

module.exports = {
    PageInfo,
    Permission,
};
