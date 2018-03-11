const { createError } = require("apollo-errors");
const authErrors = require("./authErrors");
const userErrors = require("./userErrors");

const UnknownError = createError("UnknownError", {
    message: "It's appear that there is something wrong with our server",
});

module.exports = {
    UnknownError,
    ...authErrors,
    ...userErrors,
};
