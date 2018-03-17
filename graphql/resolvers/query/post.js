const { Post } = require("../../../models/post");
const { postTypeAdapter } = require("../../adapter/postAdapter");

const posts = baseResolver.createResolver(async () => {
    const postList = await Post.find({});
    return postList.map(post => postTypeAdapter(post));
});

module.exports = {
    posts,
};
