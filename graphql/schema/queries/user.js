const { GraphQLString } = require("graphql");
const UserType = require("../../node/user");
const User = require("../../../models/user");

const user = {
    type: UserType,
    args: {
        username: { type: GraphQLString },
    },
    resolve: async (parent, { username }) => {
        const result = await User.findByUsername(username);
        console.log(result);
        if (result) {
            return { ...result, id: result._id, roles: Object.keys(result.roles) };
        }
        return result;
    },
};

module.exports = {
    user,
};