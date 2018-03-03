const Fastify = require("fastify");
const MongoModels = require("mongo-models");

const { GraphQLError } = require("graphql");
const { formatError } = require("apollo-errors");
const { UnknownError } = require("./graphql/errors");

const config = require("./config");

const GraphQLFastifyPlugin = require("./plugins/graphql");

const Schema = require("./graphql/schema");

const PORT = config.get("/port/web");

const app = Fastify({
    logger: config.get("/logging"),
});

const mongoConnection = {
    uri: config.get("/mongodb/connection/uri"),
    db: config.get("/mongodb/connection/db"),
};

const errorFormatter = error => {
    let e = formatError(error);

    if (e instanceof GraphQLError) {
        e = formatError(
            new UnknownError({
                data: {
                    originalMessage: e.message,
                    originalError: e.name,
                },
            })
        );
    }

    return e;
};

// Add auth
app
    .decorate("verifyAuthentication", function(request, reply, done) {
        if (request.headers.authorization) {
            done();
        } else {
            reply
                .header("WWW-Authenticate", "Basic")
                .code(401)
                .send("Need an Authorization header, put a non-null Authorization header to proceed");
        }
    })
    .register(require("fastify-auth"))
    .after(() => {
        app.addHook("preHandler", app.auth([app.verifyAuthentication]));
        // Setup GraphQL
        app.register(GraphQLFastifyPlugin, {
            query: {
                schema: Schema,
                graphiql: true,
                formatError: errorFormatter,
            },
            route: {
                path: "/graphql",
            },
        });
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
