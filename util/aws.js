const AWS = require("aws-sdk");
const Config = require("../config");

// process.env.AWS_ACCESS_KEY_ID= 'SECRET_ACCESS_KEY';
// process.env.AWS_SECRET_ACCESS_KEY= 'ACCESS_KEY_ID';

const s3 = new AWS.S3();
s3.config.signatureVersion = Config.get("/aws/signatureVersion");
s3.config.accessKeyId = Config.get("/aws/accessKeyID");
s3.config.secretAccessKey = Config.get("/aws/secretAccessKey");
s3.config.region = Config.get("/aws/region");

const bucketName = Config.get("/aws/s3ImageBucket");

/**
 * Front end will take care of file type
 * @param {*} fileName
 */
exports.getSignedUrlForImageUpload = function(fileName) {
    const params = { Bucket: bucketName, Key: fileName, Expires: 172800, ServerSideEncryption: "AES256" };
    return s3.getSignedUrl("putObject", params);
};

// exports.getSignedUrlForImage = function(fileName) {
//     const params = { Bucket: bucketName, Key: fileName, Expires: 172800 };
//     return s3.getSignedUrl("getObject", params);
// };

exports.getFileDetails = function(fileName, fn) {
    const params = { Bucket: bucketName, Key: fileName };
    return s3.headObject(params, (err, data) => {
        let err_msg = "";
        if (err) {
            console.log(err, err.stack);
            err_msg = new Error("Requested file name does not exist or something went wrong");
        }
        fn(err_msg, data);
    });
};
