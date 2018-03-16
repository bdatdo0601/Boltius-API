const Joi = require("joi");
const MongoModels = require("mongo-models");
const NewDate = require("joistick/new-date");

const Image = require("../general/image");

const schema = Joi.object({
    _id: Joi.object(),
    title: Joi.string().required(),
    description: Joi.array()
        .items(Joi.string())
        .default(NewArray(), "array of paragraph"),
    headerImage: Joi.object().type(Image.schema),
    isPublished: Joi.boolean().default(false),
    extraImages: Joi.array()
        .items(Image.schema)
        .default(NewArray(), "array of image"),
    createdBy: Joi.object({
        id: Joi.string().required(),
        name: Joi.string()
            .lowercase()
            .required(),
    }),
    timeCreated: Joi.date().default(NewDate(), "time of creation"),
});

class Post extends MongoModels {}

Post.collectionName = "posts";
Post.schema = schema;

module.exports = Post;
