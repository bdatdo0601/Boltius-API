import Fastify from "fastify";
import MongoModels from "mongo-models";

import config from "./config";

import GraphQLFastifyPlugin from "./plugins/graphql";

import Schema from "./graphql/schema";

const PORT = config.get("/port/web");

const app = Fastify({
    logger: config.get("/logging"),
});

const mongoConnection = {
    uri: config.get("/mongodb/connection/uri"),
    db: config.get("/mongodb/connection/db"),
};

// Declare a route
app.get("/", function(request, reply) {
    reply.send({ hello: "world" });
});

// Setup GraphQL
app.register(GraphQLFastifyPlugin, {
    query: {
        schema: Schema,
        graphiql: true,
    },
    route: {
        path: "/graphql",
    },
});

// Run the server!
const startServer = async () => {
    try {
        //setup DB
        await MongoModels.connect(mongoConnection, {});
        console.log("Database Established");
        await app.listen(PORT);
        console.log(`Server listening at port ${PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
        throw err;
    }
};

startServer();
