const Joi = require("joi");
const MongoModels = require("mongo-models");
const NewDate = require("joistick/new-date");

const schema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
    alt: Joi.string().required(),
    url: Joi.string().required(),
    timeCreated: Joi.date().default(NewDate(), "time of creation"),
});

class Image extends MongoModels {}

Image.collectionName = "images";
Image.schema = schema;

module.exports = Image;
