const { baseResolver } = require("../abstractResolvers");
const UserQuery = require("./user");
const UserRolesQuery = require("./userRoles");
const PostQuery = require("./post");

const node = baseResolver.createResolver(async (parent, { id }) => {
    return {
        id,
    };
});

module.exports = {
    Query: {
        node,
        ...UserQuery,
        ...UserRolesQuery,
        ...PostQuery,
    },
};
