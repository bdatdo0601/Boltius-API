const { adminResolver } = require("../abstractResolvers");
const { Post } = require("../../../models/post");
const { postTypeAdapter } = require("../../adapter/postAdapter");

const createPost = adminResolver.createResolver(async (parent, { input }, { currentCredentials }) => {
    const { user } = currentCredentials;
    const postData = {
        title: input.title,
        description: input.description,
        headerImage: input.headerImage,
        extraImages: input.extraImages,
    };
    const post = await Post.create(postData, user);
    return {
        post: postTypeAdapter(post),
        clientMutationId: input.clientMutationId,
    };
});

const publishPost = adminResolver.createResolver(async (parent, { input }) => {
    return { input };
});

module.exports = {
    createPost,
    publishPost,
};
