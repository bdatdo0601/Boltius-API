const { createError } = require("apollo-errors");

exports.UnknownError = createError("UnknownError", {
    message: "It's appear that there is something wrong with our server",
});

exports.UnauthenticatedError = createError("UnauthenticatedError", {
    message: "You need to log in in order to do this",
});

exports.UnauthorizedError = createError("UnauthorizedError", {
    message: "You do not have permission error",
});

exports.ForbiddenError = createError("ForbiddenError", {
    message: "You need to have root permission to perform this",
});
