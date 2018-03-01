const userTypeAdapter = data => ({
    id: data._id,
    username: data.username,
    email: data.email,
    isActive: data.isActive,
    roles: data.roles,
    timeCreated: data.timeCreated,
});

const adminTypeAdapter = data => ({
    id: data._id,
    groups: data.groups,
    first: data.name.first,
    middle: data.name.middle,
    last: data.name.last,
    user: data.user,
    timeCreated: data.timeCreated,
});

const accountTypeAdapter = data => ({
    id: data._id,
    currentStatus: data.status.current,
    statusLog: data.status.log,
    first: data.name.first,
    middle: data.name.middle,
    last: data.name.last,
    user: data.user,
    timeCreated: data.timeCreated,
});

module.exports = {
    userTypeAdapter,
    adminTypeAdapter,
    accountTypeAdapter,
};
