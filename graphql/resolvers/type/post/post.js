const { Post } = require("../../../../models/post");

const { userTypeAdapter } = require("../../../adapter/authAdapter   ");

const createdBy = async (post, args, { Loader }) => {
    return userTypeAdapter(await Loader.userIDLoader.load(post.createdBy.id));
};

const isTypeOfPost = async obj => {
    const post = await Post.findById(obj.id);
    return post;
};

module.exports = {
    Post: {
        createdBy,
        __isTypeOf: isTypeOfPost,
    },
};
