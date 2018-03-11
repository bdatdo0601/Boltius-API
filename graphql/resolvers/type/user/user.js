const Admin = require("../../../../models/admin");
const Account = require("../../../../models/account");
const User = require("../../../../models/user");

const { adminTypeAdapter, accountTypeAdapter } = require("../../../adapter/userAdapter");

const userRoles = user => {
    return Object.keys(user.roles).map(async key => {
        roleID = user.roles[key].id;
        let node;
        switch (key) {
            case "admin":
                node = adminTypeAdapter(await Admin.findById(roleID));
                break;
            case "account":
                node = accountTypeAdapter(await Account.findById(roleID));
        }
        return {
            type: key,
            node,
        };
    });
};

const isTypeOfUser = async obj => {
    const user = await User.findById(obj.id);
    return user;
};

module.exports = {
    User: {
        roles: userRoles,
        __isTypeOf: isTypeOfUser,
    },
};
