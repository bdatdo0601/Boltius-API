const QueryResolvers = require("./query");
const MutationResolvers = require("./mutation");
const TypeResolvers = require("./type");

module.exports = {
    ...QueryResolvers,
    ...MutationResolvers,
    ...TypeResolvers,
};
