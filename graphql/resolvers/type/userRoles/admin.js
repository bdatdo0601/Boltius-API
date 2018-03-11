const Admin = require("../../../../models/admin");
const AdminGroups = require("../../../../models/admin-group");

const UserAdapter = require("../../../adapter/userAdapter");

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

const user = async (admin, args, { Loader }) => {
    const userID = admin.user.id;
    const user = await Loader.userIDLoader.load(userID);
    return UserAdapter.userTypeAdapter(user);
};

const isTypeOfAdmin = async obj => {
    const admin = await Admin.findById(obj.id);
    return admin;
};

const isTypeOfAdminGroup = async obj => {
    const group = await AdminGroups.findById(obj.id);
    return group;
};

module.exports = {
    Admin: {
        user,
        groups: adminGroups,
        __isTypeOf: isTypeOfAdmin,
    },
    AdminGroup: {
        __isTypeOf: isTypeOfAdminGroup,
    },
};