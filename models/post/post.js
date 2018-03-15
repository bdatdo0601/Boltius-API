const Joi = require("joi");
const MongoModels = require("mongo-models");
const NewDate = require("joistick/new-date");

const Image = require("../general/image");

const schema = Joi.object({
    _id: Joi.object(),
    // email: Joi.string()
    //     .email()
    //     .lowercase()
    //     .required(),
    // isActive: Joi.boolean().default(true),
    // password: Joi.string(),
    // resetPassword: Joi.object({
    //     token: Joi.string().required(),
    //     expires: Joi.date().required(),
    // }),
    title: Joi.string().required(),
    description: Joi.array()
        .items(Joi.string())
        .default(NewArray(), "array of paragraph"),
    headerImage: Joi.object().type(Image.schema),
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

Post.collectionName = "users";
Post.schema = schema;

module.exports = User;
