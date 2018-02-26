import Joi from "joi";
import MongoModels from "mongo-models";
import NewDate from "joistick/new-date";

const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    timeCreated: Joi.date().default(NewDate(), "time of creation"),
    adminCreated: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
    }).required(),
});

class StatusEntry extends MongoModels {}

StatusEntry.schema = schema;

export default StatusEntry;
