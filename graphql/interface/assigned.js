const { GraphQLInterfaceType, GraphQLString } = require("graphql");

const RoleInterface = require("./role");

const AssignedInterface = new GraphQLInterfaceType({
    name: "Assigned",
    fields: () => ({
        createdBy: { type: RoleInterface },
        timeCreated: { type: GraphQLString },
    }),
});

module.exports = AssignedInterface;
