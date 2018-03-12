const { createError } = require("apollo-errors");

exports.UserNotFoundError = createError("UserNotFoundError", {
    message: "Can't find User",
});

exports.AdminNotFoundError = createError("AdminNotFoundError", {
    message: "Can't find admin",
});

exports.AccountNotFoundError = createError("AccountNotFoundError", {
    message: "Can't find account",
});
