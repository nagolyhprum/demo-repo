import dynamodb from "dynamodb";
import Joi from "joi";

dynamodb.AWS.config.update({
  accessKeyId: "AKID",
  endpoint: "http://localstack:4569",
  region: "local",
  secretAccessKey: "SECRET",
});

export const Account = dynamodb.define("Account", {
  hashKey : "email",
  schema : {
    age     : Joi.number(),
    email   : Joi.string().email(),
    name    : Joi.string(),
    roles   : dynamodb.types.stringSet(),
    settings : {
      acceptedTerms : Joi.boolean().default(false),
      nickname      : Joi.string(),
    },
  },
  timestamps : true,
});

export default dynamodb;
