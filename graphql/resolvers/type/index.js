const userTypeResolvers = require("./user");
const userRolesTypeResolvers = require("./userRoles");

module.exports = {
    ...userTypeResolvers,
    ...userRolesTypeResolvers,
};
