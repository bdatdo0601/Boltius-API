const { GraphQLInterfaceType, GraphQLList, GraphQLString, GraphQLID, GraphQLObjectType } = require("graphql");

const NodeInterface = new GraphQLInterfaceType({
    name: "Node",
    fields: () => ({
        id: { type: GraphQLID },
    }),
});

const EdgeInterface = new GraphQLInterfaceType({
    name: "Edge",
    fields: () => ({
        cursor: { type: GraphQLString },
        node: { type: NodeInterface },
    }),
});

const ConnectionInterface = new GraphQLInterfaceType({
    name: "Connection",
    fields: () => ({
        edges: { type: new GraphQLList(EdgeInterface) },
        pageInfo: { type: PageInfo },
    }),
});

const InputInterface = new GraphQLInterfaceType({
    name: "Input",
    fields: () => ({
        clientMutationId: { type: GraphQLID },
    }),
});

const PayloadInterface = new GraphQLInterfaceType({
    name: "Payload",
    fields: () => ({
        clientMutationId: { type: GraphQLID },
    }),
});

const AssignedInterface = new GraphQLInterfaceType({
    name: "Assigned",
    fields: () => ({
        createdBy: { type: RoleInterface },
        timeCreated: { type: GraphQLString },
    }),
});

const RoleInterface = new GraphQLInterfaceType({
    name: "Role",
    fields: () => ({
        fullName: {
            name: "FullName",
            type: new GraphQLObjectType({
                name: "FullName",
                fields: () => ({
                    first: { type: GraphQLString },
                    middle: { type: GraphQLString },
                    last: { type: GraphQLString },
                }),
            }),
        },
        timeCreated: { type: GraphQLString },
    }),
});

module.exports = {
    NodeInterface,
    EdgeInterface,
    ConnectionInterface,
    InputInterface,
    PayloadInterface,
    AssignedInterface,
    RoleInterface,
};
