const UserMutation = require("./user");
const UtilMutation = require("./util");
const PostMutation = require("./post");

module.exports = {
    Mutation: {
        ...UserMutation,
        ...UtilMutation,
        ...PostMutation,
    },
};
