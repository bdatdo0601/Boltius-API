const Account = require("../../../../models/account");
const Admin = require("../../../../models/admin");
const User = require("../../../../models/user");
const AdminGroups = require("../../../../models/admin-group");

const { adminTypeAdapter, accountTypeAdapter } = require("../../../adapter/userAdapter");

const roles = user => {
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

const adminGroups = async obj => {
    let groupList = [];
    if (obj.groups) {
        const groups = await AdminGroups.find({
            _id: {
                $in: Object.keys(obj.groups),
            },
        });
        groupList = groupList.concat(groups.map(group => ({ id: group._id, name: group.name })));
    }
    return groupList;
};

const isTypeOfUser = async obj => {
    const user = await User.findById(obj.id);
    return user;
};

const isTypeOfAdmin = async obj => {
    const admin = await Admin.findById(obj.id);
    return admin;
};

const isTypeOfAccount = async obj => {
    const account = await Account.findById(obj.id);
    return account;
};

module.exports = {
    User: {
        roles,
        __isTypeOf: isTypeOfUser,
    },
    Admin: {
        groups: adminGroups,
        __isTypeOf: isTypeOfAdmin,
    },
    Account: {
        __isTypeOf: isTypeOfAccount,
    },
};
