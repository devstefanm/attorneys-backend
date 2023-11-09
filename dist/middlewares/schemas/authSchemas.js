"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationSchema = exports.loginSchema = void 0;
var joi_1 = __importDefault(require("joi"));
var passwordSchema = joi_1.default.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/)
    .required()
    .label('Password')
    .messages({
    'string.pattern.base': 'errors.passwordComplexity',
});
var passwordLengthSchema = joi_1.default.string()
    .min(6)
    .messages({ 'string.pattern.base': 'errors.newPasswordTooShort' });
exports.loginSchema = joi_1.default.object({
    identifier: joi_1.default.string().required().label('Username or Email'),
    password: passwordSchema,
});
exports.registrationSchema = joi_1.default.object({
    newPassword: joi_1.default.string()
        .required()
        .concat(passwordSchema)
        .concat(passwordLengthSchema),
});
