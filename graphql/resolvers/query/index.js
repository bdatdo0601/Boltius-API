const { baseResolver } = require("../abstractResolvers");
const UserQuery = require("./user");

const node = baseResolver.createResolver(async (parent, { id }) => {
    return {
        id,
    };
});

module.exports = {
    Query: {
        node,
        ...UserQuery,
    },
};
