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
