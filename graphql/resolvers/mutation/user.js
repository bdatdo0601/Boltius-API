const User = require("../../../models/user");
const Session = require("../../../models/session");
const AuthAttempt = require("../../../models/auth-attempt");
const { AbusiveError, InvalidError } = require("../../errors");
const { baseResolver } = require("../abstractResolvers");

const { userTypeAdapter } = require("../../adapter/userAdapter");

const login = baseResolver.createResolver(async (parent, { usernameOrEmail, password }, { request }) => {
    const ip = request.raw.connection.remoteAddress;
    const detected = await AuthAttempt.abuseDetected(ip, usernameOrEmail);

    if (detected) {
        throw new AbusiveError();
    }

    const user = await User.findByCredentials(usernameOrEmail, password);
    if (!user) {
        await AuthAttempt.create(ip, usernameOrEmail);
        throw new InvalidError();
    }

    const userAgent = request.headers["user-agent"];
    const session = await Session.create(user._id.toString(), ip, userAgent);
    const credentials = `${session._id}:${session.key}`;
    const authHeader = `Basic ${new Buffer(credentials).toString("base64")}`;
    const result = userTypeAdapter(user);
    return {
        ...result,
        session,
        authHeader,
    };
});

module.exports = {
    login,
};
