const Account = require("../../../../models/account");
const StatusEntry = require("../../../../models/status-entry");

const accountNotes = async account => {
    return account.notes.map(async note => ({
        data: note.data,
        timeCreated: note.timeCreated,
        createdBy: await Admin.findById(note.adminCreated.id),
    }));
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
        notes: accountNotes,
        __isTypeOf: isTypeOfAccount,
    },
    AccountStatus: {
        __isTypeOf: isTypeOfAccountStatus,
    },
};
