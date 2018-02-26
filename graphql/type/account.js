import { GraphQLObjectType, GraphQLList } from "graphql";

import RoleInterface from "../interface/role";
import AssignedInterface from "../interface/assigned";
import NoteType from "./note";

const AssignedNoteType = new GraphQLObjectType({
    name: "Assigned NoteType",
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

export default AccountType;
