import Fastify from "fastify";

const fastify = Fastify();

// Declare a route
fastify.get("/", function(request, reply) {
    reply.send({ hello: "world" });
});

// Run the server!
fastify.listen(3000, function(err) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
