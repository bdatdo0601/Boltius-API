const { createError } = require("apollo-errors");

exports.UnknownError = createError("UnknownError", {
    message: "It's appear that there is something wrong with our server",
});

exports.UnauthenticatedError = createError("UnauthenticatedError", {
    message: "you need to log in in order to do this",
});
