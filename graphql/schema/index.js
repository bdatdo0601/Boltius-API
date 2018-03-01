const path = require("path");
const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");

const QueryResolvers = require("../resolvers/query");
const TypeResolvers = require("../resolvers/type");

const typeDefs = importSchema(path.join(__dirname, "schema.graphql"));
const resolvers = {
    ...QueryResolvers,
    ...TypeResolvers,
};

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers,
});
