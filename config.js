const Confidence = require("confidence");
const Dotenv = require("dotenv");

Dotenv.config({ silent: true });

const criteria = {
    env: process.env.NODE_ENV,
};

const config = {
    $meta: "This file configures the plot device.",
    projectName: "Wentworth Student Government Boltius Tool",
    logging: {
        $filter: "env",
        production: false,
        $default: true,
    },
    port: {
        web: {
            $filter: "env",
            test: 9090,
            production: process.env.PORT,
            $default: 9000,
        },
    },
    authAttempts: {
        forIp: 50,
        forIpAndUser: 7,
    },
    mongodb: {
        connection: {
            uri: {
                $filter: "env",
                production: process.env.MONGODB_URI,
                $default: "mongodb://localhost:27017/",
            },
            db: {
                $filter: "env",
                production: process.env.MONGODB_DB_NAME,
                test: "BoltiusDB-test",
                $default: "BoltiusDB",
            },
        },
    },
    autoIndex: true,
    nodemailer: {
        host: {
            $filter: "env",
            production: process.env.EMAIL_HOST,
            $default: "outlook.office365.com",
        },
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PWD,
        },
    },
    aws: {
        accessKeyID: {
            $filter: "env",
            dev: process.env.AWS_ACCESS_KEY_ID,
            production: process.env.AWS_ACCESS_KEY_ID,
            $default: "ACCESS_KEY_ID",
        },
        secretAccessKey: {
            $filter: "env",
            dev: process.env.AWS_SECRET_ACCESS_KEY,
            production: process.env.AWS_SECRET_ACCESS_KEY,
            $default: "SECRET_ACCESS_KEY",
        },
        s3ImageBucket: {
            $filter: "env",
            dev: process.env.S3_BUCKET,
            production: process.env.S3_BUCKET,
            $default: "BOLTIUS_TEST_BUCKET",
        },
        region: {
            $filter: "env",
            dev: process.env.AWS_REGION,
            production: process.env.AWS_REGION,
            $default: "AWS_REGION",
        },
        signatureVersion: "v4",
    },
    system: {
        fromAddress: {
            name: "Wentworth Student Government",
            address: "wsg@wit.edu",
        },
        toAddress: {
            name: "Wentworth Student Government",
            address: "wsg@wit.edu",
        },
    },
};

const store = new Confidence.Store(config);

exports.get = function(key) {
    return store.get(key, criteria);
};

exports.meta = function(key) {
    return store.meta(key, criteria);
};
