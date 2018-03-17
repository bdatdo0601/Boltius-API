const Joi = require("joi");
const MongoModels = require("mongo-models");
const Assert = require("assert");
const NewDate = require("joistick/new-date");
const NewArray = require("joistick/new-array");

const schema = Joi.object({
    _id: Joi.object(),
    title: Joi.string().required(),
    description: Joi.array()
        .items(Joi.string())
        .default(NewArray(), "array of paragraph"),
    headerImage: Joi.object({
        name: Joi.string().required(),
        alt: Joi.string().required(),
        url: Joi.string().required(),
    }),
    isPublished: Joi.boolean().default(false),
    extraImages: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().required(),
                alt: Joi.string().required(),
                url: Joi.string().required(),
            })
        )
        .default(NewArray(), "array of image"),
    createdBy: Joi.object({
        id: Joi.string().required(),
        username: Joi.string()
            .lowercase()
            .required(),
    }),
    publishedDate: Joi.date(),
    timeCreated: Joi.date().default(NewDate(), "time of creation"),
});

class Post extends MongoModels {
    static async create(postData, user) {
        Assert.ok(postData, "Missing Post Data");
        Assert.ok(user, "Missing User");
        const input = new this({
            ...postData,
            createdBy: {
                id: user._id.toString(),
                username: user.username,
            },
        });
        const posts = await this.insertOne(input);

        return posts[0];
    }

    async publish() {
        const update = {
            $set: {
                isPublished: true,
                publishedDate: new Date(),
            },
        };
        return await Post.findByIdAndUpdate(this._id, update);
    }
}

Post.collectionName = "posts";
Post.schema = schema;

module.exports = Post;
