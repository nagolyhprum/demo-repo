import dynamodb from "dynamodb";
import Joi from "joi";

dynamodb.AWS.config.update({
  accessKeyId: "AKID",
  endpoint: "http://localstack:4569",
  region: "local",
  secretAccessKey: "SECRET",
});

export const Language = dynamodb.define("Language", {
  hashKey : "_id",
  schema : {
    _id : dynamodb.types.uuid(),
    name : Joi.string().required(),
  },
  timestamps : true,
});

export default dynamodb;
