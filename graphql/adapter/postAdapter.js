const postTypeAdapter = data => ({
    id: data._id,
    ...data,
});

module.exports = {
    postTypeAdapter,
};
