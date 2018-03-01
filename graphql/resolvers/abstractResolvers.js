const { createResolver } = require("apollo-resolvers");
const { isInstance } = require("apollo-errors");

const Error = require("../errors");

const baseResolver = createResolver(
    null,
    (root, args, context, error) => (isInstance(error) ? error : new Error.UnknownError())
);

const accountResolver = baseResolver.createResolver(null);

const adminResolver = accountResolver.createResolver(null);

const rootResolver = adminResolver.createResolver(null);

module.exports = {
    baseResolver,
    accountResolver,
    adminResolver,
    rootResolver,
};
