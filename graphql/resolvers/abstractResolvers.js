const { createResolver } = require("apollo-resolvers");
const { isInstance } = require("apollo-errors");

const { User, Session } = require("../../models/user");
const config = require("../../config");
const { getDataFromAuthHeader } = require("../adapter/authAdapter");

const Error = require("../errors");

const baseResolver = createResolver(
    (root, args, context) => {
        context.auth = getDataFromAuthHeader(context.request.headers.authorization);
    },
    (root, args, context, error) => {
        if (isInstance(error)) {
            return error;
        } else {
            return config.get("/logging") ? new Error.UnknownError(error) : new Error.UnknownError();
        }
    }
);

const accountResolver = baseResolver.createResolver(async (root, args, context) => {
    const { auth } = context;
    if (auth.sessionId === "" || auth.key === "") {
        throw new Error.UnauthenticatedError();
    }
    const session = await Session.findByCredentials(auth.sessionId, auth.key);
    if (!session) {
        throw new Error.UnauthenticatedError();
    }
    session.updateLastActive();
    const user = await User.findById(session.userId);
    if (!user) {
        throw new Error.UnauthenticatedError();
    }

    if (!user.isActive) {
        throw new Error.NotActiveError();
    }

    const roles = await user.hydrateRoles();
    context.currentCredentials = {
        scope: Object.keys(user.roles),
        roles,
        session,
        user,
    };
});

const adminResolver = accountResolver.createResolver((root, args, context) => {
    const { currentCredentials } = context;
    if (!currentCredentials.scope.includes("admin")) {
        throw new Error.UnauthorizedError();
    }
});

const rootResolver = adminResolver.createResolver((root, args, context) => {
    const { currentCredentials } = context;
    const admin = currentCredentials.roles.admin;
    if (!admin.isMemberOf("root")) {
        throw new Error.ForbiddenError();
    }
});

module.exports = {
    baseResolver,
    accountResolver,
    adminResolver,
    rootResolver,
};
