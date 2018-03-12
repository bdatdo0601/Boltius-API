const User = require("../../../models/user");
const Errors = require("../../errors/userErrors");
const { adminResolver } = require("../abstractResolvers");

const { userTypeAdapter } = require("../../adapter/userAdapter");

const user = adminResolver.createResolver(async (parent, { usernameOrEmail }) => {
    const result = await User.findByUsername(usernameOrEmail);
    if (!result) {
        throw new Errors.UserNotFoundError();
    }
    return userTypeAdapter(result);
});

const users = adminResolver.createResolver(async () => {
    const userList = await User.find({});
    return userList.map(user => userTypeAdapter(user));
});

module.exports = {
    user,
    users,
};
