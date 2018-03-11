// const Session = require("./models/session");
// const User = require("./models/user");

const getDataFromAuthHeader = authHeader => {
    if (!authHeader) {
        return { sessionId: "", key: "" };
    }
    const rawData = authHeader.split(" ")[1];

    var buf = new Buffer(rawData, "base64"); // create a buffer and tell it the data coming in is base64
    var plain_auth = buf.toString(); // read it back out as a string

    // At this point plain_auth = "username:password"
    var creds = plain_auth.split(":"); // split on a ':'
    return {
        sessionId: creds[0],
        key: creds[1],
    };
};

module.exports = {
    getDataFromAuthHeader,
};
