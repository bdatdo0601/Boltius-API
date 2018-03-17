const UserMutation = require("./user");
const UtilMutation = require("./util");

module.exports = {
    Mutation: {
        ...UserMutation,
        ...UtilMutation,
    },
};
