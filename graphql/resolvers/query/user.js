const User = require("../../../models/user");
const { adminResolver } = require("../abstractResolvers");

const { userTypeAdapter } = require("../../adapter/userAdapter");

const user = adminResolver.createResolver(async (parent, { usernameOrEmail }) => {
    const result = await User.findByUsername(usernameOrEmail);
    return userTypeAdapter(result);
});

module.exports = {
    user,
};
