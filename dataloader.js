// Implement when there is many to one relationship or nested relationship
const DataLoader = require("dataloader");
const _ = require("lodash");

const { User } = require("./models/user");
const { Admin, Account } = require("./models/userRoles");

const batchUsingID = async (ids, model) => {
    const list = await model.find({});
    const listAsObject = _.keyBy(list, "_id");
    return ids.map(id => listAsObject[id]);
};

module.exports = {
    userIDLoader: new DataLoader(ids => batchUsingID(ids, User)),
    adminIDLoader: new DataLoader(ids => batchUsingID(ids, Admin)),
    accountIDLoader: new DataLoader(ids => batchUsingID(ids, Account)),
};
