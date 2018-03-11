const { createError } = require("apollo-errors");

exports.UserNotFoundError = createError("UserNotFoundError", {
    message: "Can't find User",
});
