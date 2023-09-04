"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.casesSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.casesSchema = joi_1.default.object({
    // first_name: Joi.string().when('is_legal', {
    //   is: false,
    //   then: Joi.string().required(),
    //   otherwise: Joi.forbidden(),
    // }),
    // last_name: Joi.string().when('is_legal', {
    //   is: false,
    //   then: Joi.string().required(),
    //   otherwise: Joi.forbidden(),
    // }),
    // name: Joi.string().when('is_legal', {
    //   is: true,
    //   then: Joi.string().required(),
    //   otherwise: Joi.forbidden(),
    // }),
    cession: joi_1.default.number().required(),
    principal: joi_1.default.number().required(),
    interest: joi_1.default.number().required(),
    client_id: joi_1.default.number().required(),
    debtor_id: joi_1.default.number().required(),
    state: joi_1.default.string().required(),
    contract_number: joi_1.default.string().required(),
    case_number: joi_1.default.string().required(),
});
