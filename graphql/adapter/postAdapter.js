const postTypeAdapter = data => ({
    id: data._id,
    createdTime: data.timeCreated,
    title: data.title,
    isPublished: data.isPublished,
    description: data.description,
});

module.exports = {
    postTypeAdapter,
};
