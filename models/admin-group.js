import Assert from "assert";
import Joi from "joi";
import MongoModels from "mongo-models";
import Slug from "slug";

const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    permissions: Joi.object().description("{ permission: boolean, ... }"),
});

class AdminGroup extends MongoModels {
    static async create(name) {
        Assert.ok(name, "Missing name argument.");

        const document = new this({
            _id: Slug(name).toLowerCase(),
            name,
        });
        const groups = await this.insertOne(document);

        return groups[0];
    }

    hasPermissionTo(permission) {
        Assert.ok(permission, "Missing permission argument.");

        if (this.permissions && this.permissions.hasOwnProperty(permission)) {
            return this.permissions[permission];
        }

        return false;
    }
}

AdminGroup._idClass = String;
AdminGroup.collectionName = "adminGroups";
AdminGroup.schema = schema;

export default AdminGroup;
