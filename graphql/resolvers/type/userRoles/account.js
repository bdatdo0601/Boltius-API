const Account = require("../../../../models/account");
const StatusEntry = require("../../../../models/status-entry");

const UserAdapter = require("../../../adapter/userAdapter");

const accountNotes = async (account, args, { Loader }) => {
    return account.notes.map(async note => ({
        data: note.data,
        timeCreated: note.timeCreated,
        createdBy: await Loader.adminIDLoader.load(note.adminCreated.id),
    }));
};

const user = async (account, args, { Loader }) => {
    const userID = account.user.id;
    const user = await Loader.userIDLoader.load(userID);
    return UserAdapter.userTypeAdapter(user);
};

const name = account => {
    return {
        first: account.first,
        middle: account.middle,
        last: account.last,
    };
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
    Account: {
        user,
        name,
        notes: accountNotes,
        __isTypeOf: isTypeOfAccount,
    },
    AccountStatus: {
        __isTypeOf: isTypeOfAccountStatus,
    },
};
