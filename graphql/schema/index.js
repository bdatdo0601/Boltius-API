const path = require("path");
const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");

const QueryResolvers = require("../resolvers/query");
const MutationResolvers = require("../resolvers/mutation");
const TypeResolvers = require("../resolvers/type");

const typeDefs = importSchema(path.join(__dirname, "schema.graphql"));
const resolvers = {
    ...QueryResolvers,
    ...MutationResolvers,
    ...TypeResolvers,
};

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers,
});
