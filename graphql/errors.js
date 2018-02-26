import { createError } from "apollo-errors";

export const UnknownError = createError("UnknownError", {
    message: "It's appear that there is something wrong with our server",
});

export const UnauthenticatedError = createError("UnauthenticatedError", {
    message: "you need to log in in order to do this",
});
