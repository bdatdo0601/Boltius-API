import Account from "./models/account";
import Admin from "./models/admin";
import AdminGroup from "./models/admin-group";
import AuthAttempt from "./models/auth-attempt";
import MongoModels from "mongo-models";
import Promptly from "promptly";
import Session from "./models/session";
import Status from "./models/status";
import User from "./models/user";

const main = async function() {
    let options = {};

    // get mongodb connection info

    options = {
        default: "mongodb://localhost:27017/",
    };
    const mongodbUri = await Promptly.prompt(`MongoDB URI: (${options.default})`, options);

    options = {
        default: "BoltiusDB",
    };
    const mongodbName = await Promptly.prompt(`MongoDB name: (${options.default})`, options);

    // connect to db

    const db = await MongoModels.connect({ uri: mongodbUri, db: mongodbName });

    if (!db) {
        throw Error("Could not connect to MongoDB.");
    }

    // get root user creds

    const rootEmail = await Promptly.prompt("Root user email:");
    const rootPassword = await Promptly.password("Root user password:");

    // clear tables

    await Promise.all([
        Account.deleteMany({}),
        AdminGroup.deleteMany({}),
        Admin.deleteMany({}),
        AuthAttempt.deleteMany({}),
        Session.deleteMany({}),
        Status.deleteMany({}),
        User.deleteMany({}),
    ]);

    // setup root group

    await AdminGroup.create("Root");

    // setup root admin and user

    await Admin.insertOne(
        new Admin({
            _id: Admin.ObjectId("111111111111111111111111"),
            groups: {
                root: "Root",
            },
            name: {
                first: "Root",
                middle: "",
                last: "Admin",
            },
            user: {
                id: "000000000000000000000000",
                name: "root",
            },
        })
    );

    const passwordHash = await User.generatePasswordHash(rootPassword);

    await User.insertOne(
        new User({
            _id: User.ObjectId("000000000000000000000000"),
            email: rootEmail.toLowerCase(),
            password: passwordHash.hash,
            roles: {
                admin: {
                    id: "111111111111111111111111",
                    name: "Root Admin",
                },
            },
            username: "root",
        })
    );

    // all done

    MongoModels.disconnect();

    console.log("First time setup complete.");

    process.exit(0);
};

main().catch(err => {
    console.log("First time setup failed.");
    console.error(err);

    MongoModels.disconnect();

    process.exit(1);
});
