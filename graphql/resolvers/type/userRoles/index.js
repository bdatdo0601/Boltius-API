const AdminTypeResolver = require("./admin");
const AccountTypeResolver = require("./account");

module.exports = {
    ...AdminTypeResolver,
    ...AccountTypeResolver,
};
