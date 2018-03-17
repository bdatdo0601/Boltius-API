const { createError } = require("apollo-errors");

exports.NotAuthorError = createError("NotAuthorError", {
    message: "Can't publish unless author",
});
