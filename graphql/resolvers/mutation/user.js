const { User, Session, AuthAttempt } = require("../../../models/user");
const { Account, Admin } = require("../../../models/userRoles");
const Errors = require("../../errors");
const { baseResolver, rootResolver, accountResolver } = require("../abstractResolvers");

const { userTypeAdapter } = require("../../adapter/userAdapter");

// *********************************************************
// *HELPER FUNCTION
// *********************************************************
const alreadyExisted = async ({ username, email }) => {
    // check username and email
    const attemptGetUserByUsername = await User.findByUsername(username);
    if (attemptGetUserByUsername) {
        throw new Errors.UserExistedError();
    }
    const attemptGetUserByEmail = await User.findByEmail(email);
    if (attemptGetUserByEmail) {
        throw new Errors.EmailExistedError();
    }
};

const generateSessionAndAuthHeader = async (userAgent, ip, user) => {
    const session = await Session.create(user._id.toString(), ip, userAgent);
    const credentials = `${session._id}:${session.key}`;
    const authHeader = `Basic ${new Buffer(credentials).toString("base64")}`;
    return {
        session,
        authHeader,
    };
};
// *********************************************************
// *MUTATIONS
// *********************************************************
const login = baseResolver.createResolver(async (parent, { input }, { request }) => {
    const ip = request.raw.connection.remoteAddress;
    const detected = await AuthAttempt.abuseDetected(ip, input.usernameOrEmail);

    if (detected) {
        throw new Errors.AbusiveError();
    }
    const user = await User.findByCredentials(input.usernameOrEmail, input.password);
    if (!user) {
        await AuthAttempt.create(ip, input.usernameOrEmail);
        throw new Errors.InvalidError();
    }
    const authData = await generateSessionAndAuthHeader(request.headers["user-agent"], ip, user);
    const { clientMutationId } = input;
    return {
        user: userTypeAdapter(user),
        ...authData,
        clientMutationId,
    };
});

const createNewUserAccount = baseResolver.createResolver(async (parent, { input }, { request }) => {
    const ip = request.raw.connection.remoteAddress;
    await alreadyExisted(input);
    let [account, user] = await Promise.all([
        Account.create(input.name),
        User.create(input.username, input.password, input.email),
    ]);
    [account, user] = await Promise.all([
        account.linkUser(`${user._id}`, user.username),
        user.linkAccount(`${account._id}`, account.fullName()),
    ]);

    // TODO: Send welcome email

    const authData = await generateSessionAndAuthHeader(request.headers["user-agent"], ip, user);
    const { clientMutationId } = input;
    return {
        user: userTypeAdapter(user),
        ...authData,
        clientMutationId,
    };
});

const createNewUserAdmin = rootResolver.createResolver(async (parent, { input }, { request }) => {
    const ip = request.raw.connection.remoteAddress;
    await alreadyExisted(input);
    let [admin, user] = await Promise.all([
        Admin.create(input.name),
        User.create(input.username, input.password, input.email),
    ]);
    [admin, user] = await Promise.all([
        admin.linkUser(`${user._id}`, user.username),
        user.linkAdmin(`${admin._id}`, admin.fullName()),
    ]);

    // TODO: Send welcome email

    const authData = await generateSessionAndAuthHeader(request.headers["user-agent"], ip, user);
    const { clientMutationId } = input;
    return {
        user: userTypeAdapter(user),
        ...authData,
        clientMutationId,
    };
});

const logout = accountResolver.createResolver((parent, { input }, { currentCredentials }) => {
    if (!currentCredentials) {
        return { message: "success", clientMutationId: input.clientMutationId };
    }
    Session.findByIdAndDelete(currentCredentials.session._id);
    return { message: "success", clientMutationId: input.clientMutationId };
});

module.exports = {
    login,
    createNewUserAccount,
    createNewUserAdmin,
    logout,
};
