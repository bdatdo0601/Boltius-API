const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID } = require("graphql");

const { RoleInterface, AssignedInterface, NodeInterface } = require("../interface");

const NoteType = require("./note");

const AssignedNoteType = new GraphQLObjectType({
    name: "Assigned Note Type",
    interfaces: [AssignedInterface],
    fields: () => ({
        note: { type: NoteType },
        createdBy: { type: RoleInterface },
        timeCreated: { type: GraphQLString },
    }),
});

const AssignedStatusType = new GraphQLObjectType({
    name: "Assigned Status Type",
    interfaces: [AssignedInterface],
    fields: () => ({
        status: { type: StatusType },
        createdBy: { type: RoleInterface },
        timeCreated: { type: GraphQLString },
    }),
});

const AccountType = new GraphQLObjectType({
    name: "Account",
    interfaces: [RoleInterface, NodeInterface],
    fields: () => ({
        id: { type: GraphQLID },
        status: {
            type: new GraphQLObjectType({
                fields: () => ({
                    current: { type: AssignedStatusType },
                    log: { type: new GraphQLList(AssignedStatusType) },
                }),
            }),
        },
        notes: {
            name: "Array of Admin note",
            type: new GraphQLList(AssignedNoteType),
        },
        fullName: {
            type: new GraphQLObjectType({
                fields: () => ({
                    first: { type: GraphQLString },
                    middle: { type: GraphQLString },
                    last: { type: GraphQLString },
                }),
            }),
        },
        user: { type: UserType },
        timeCreated: { type: GraphQLString },
    }),
});

module.exports = AccountType;
