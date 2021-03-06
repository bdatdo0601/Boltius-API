const { createError } = require("apollo-errors");

exports.NotActiveError = createError("NotActiveError", {
    message: "User is not active",
});

exports.InvalidError = createError("InvalidError", {
    message: "Credentials are invalid or account is inactive.",
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

exports.AbusiveError = createError("AbusiveError", {
    message: "You tried to log in too many time",
});

exports.UserExistedError = createError("UserExistedError", {
    message: "Username already in use",
});

exports.EmailExistedError = createError("EmailExistedError", {
    message: "Email already in use",
});
