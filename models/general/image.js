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

class Image extends MongoModels {
    static async create(name, alt, url) {
        Assert.ok(name, "Missing name.");
        Assert.ok(alt, "Missing alternate tag");
        Assert.ok(url, "Missing picture url");

        const input = new Image({
            name,
            alt,
            url,
        });
        const image = await this.insertOne(input);
        return image;
    }
}

Image.collectionName = "images";
Image.schema = schema;

module.exports = Image;
