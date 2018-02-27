const { createResolver } = require("apollo-resolvers");
const { isInstance } = require("apollo-errors");

const Error = require("./errors");

module.baseResolver = createResolver(
    null,
    (root, args, context, error) => (isInstance(error) ? error : new Error.UnknownError())
);

module.accountResolver = baseResolver.createResolver(null);

module.adminResolver = accountResolver.createResolver(null);

module.rootResolver = adminResolver.createResolver(null);
