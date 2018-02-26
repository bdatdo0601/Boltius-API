import Joi from "joi";
import MongoModels from "mongo-models";
import NewDate from "joistick/new-date";

const schema = Joi.object({
    adminCreated: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
    }).required(),
    data: Joi.string().required(),
    timeCreated: Joi.date().default(NewDate(), "time of creation"),
});

class NoteEntry extends MongoModels {}

NoteEntry.schema = schema;

export default NoteEntry;
