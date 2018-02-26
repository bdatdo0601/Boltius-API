import { GraphQLString } from "graphql";
import UserType from "../type/user";
import User from "../../models/user";

const user = {
    type: UserType,
    args: {
        username: { type: GraphQLString },
    },
    resolve: async (parent, { username }) => {
        const result = await User.findByUsername(username);
        if (result) {
            return { ...result, id: result._id, roles: Object.keys(result.roles) };
        }
        return result;
    },
};

export default {
    user,
};
