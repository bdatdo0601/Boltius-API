const { getSignedUrlForImageUpload } = require("../../../util/aws");
const { adminResolver } = require("../abstractResolvers");

const getImageUploadURL = adminResolver.createResolver(async (parent, { input }) => {
    const { clientMutationId, fileName } = input;
    const image = {
        name: fileName,
        alt: fileName,
        url: getSignedUrlForImageUpload(fileName),
    };
    return {
        image,
        clientMutationId,
    };
});

module.exports = {
    getImageUploadURL,
};
