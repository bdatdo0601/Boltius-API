const Account = require("../../../../models/account");
const Admin = require("../../../../models/admin");
const User = require("../../../../models/user");
const AdminGroups = require("../../../../models/admin-group");
const StatusEntry = require("../../../../models/status-entry");

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

const adminGroups = async admin => {
    let groupList = [];
    if (admin.groups) {
        const groups = await AdminGroups.find({
            _id: {
                $in: Object.keys(admin.groups),
            },
        });
        groupList = groupList.concat(groups.map(group => ({ id: group._id, name: group.name })));
    }
    return groupList;
};

const accountNotes = async account => {
    return account.notes.map(async note => ({
        data: note.data,
        timeCreated: note.timeCreated,
        createdBy: await Admin.findById(note.adminCreated.id),
    }));
};

const isTypeOfUser = async obj => {
    const user = await User.findById(obj.id);
    return user;
};

const isTypeOfAdmin = async obj => {
    const admin = await Admin.findById(obj.id);
    return admin;
};

const isTypeOfAdminGroup = async obj => {
    const group = await AdminGroups.findById(obj.id);
    return group;
};

const isTypeOfAccount = async obj => {
    const account = await Account.findById(obj.id);
    return account;
};

const isTypeOfAccountStatus = async obj => {
    try {
        const accountStatus = await StatusEntry.findById(obj.id);
        return accountStatus;
    } catch (err) {
        return false;
    }
};

module.exports = {
    User: {
        roles: userRoles,
        __isTypeOf: isTypeOfUser,
    },
    Admin: {
        groups: adminGroups,
        __isTypeOf: isTypeOfAdmin,
    },
    Account: {
        notes: accountNotes,
        __isTypeOf: isTypeOfAccount,
    },
    AdminGroup: {
        __isTypeOf: isTypeOfAdminGroup,
    },
    AccountStatus: {
        __isTypeOf: isTypeOfAccountStatus,
    },
};
