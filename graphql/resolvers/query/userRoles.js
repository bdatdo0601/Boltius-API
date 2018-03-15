const { Admin, Account } = require("../../../models/userRoles");
const Errors = require("../../errors/userErrors");
const { baseResolver } = require("../abstractResolvers");

const { adminTypeAdapter, accountTypeAdapter } = require("../../adapter/userAdapter");

const admin = baseResolver.createResolver(async (parent, { id }, { Loader }) => {
    const result = await Loader.adminIDLoader.load(id);
    if (!result) {
        throw new Errors.AdminNotFoundError();
    }
    return adminTypeAdapter(result);
});

const admins = baseResolver.createResolver(async () => {
    const adminList = await Admin.find({});
    return adminList.map(admin => adminTypeAdapter(admin));
});

const account = baseResolver.createResolver(async (parent, { id }, { Loader }) => {
    const result = await Loader.accountIDLoader.load(id);
    if (!result) {
        throw new Errors.AccountNotFoundError();
    }
    return accountTypeAdapter(result);
});

const accounts = baseResolver.createResolver(async () => {
    const accountList = await Account.find({});
    return accountList.map(account => accountTypeAdapter(account));
});

module.exports = {
    admin,
    admins,
    account,
    accounts,
};
