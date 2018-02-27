const { GraphQLObjectType, GraphQLList } = require("graphql");

const RoleInterface = require("../interface/role");
const AssignedInterface = require("../interface/assigned");
const NoteType = require("./note");

const AssignedNoteType = new GraphQLObjectType({
    name: "Assigned Note Type",
    interfaces: [AssignedInterface],
    fields: () => ({
        note: { type: NoteType },
    }),
});

const AssignedStatusType = new GraphQLObjectType({
    name: "Assigned Status Type",
    interfaces: [AssignedInterface],
    fields: () => ({
        status: { type: StatusType },
    }),
});

const AccountType = new GraphQLObjectType({
    name: "Account",
    interfaces: [RoleInterface],
    fields: () => ({
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
    }),
});

module.exports = AccountType;
