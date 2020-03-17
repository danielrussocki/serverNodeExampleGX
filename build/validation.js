"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const registerValidation = (data) => {
    const schema = joi_1.default.object({
        users_name: joi_1.default.string()
            .min(2)
            .required(),
        users_username: joi_1.default.string()
            .min(6)
            .max(20)
            .required(),
        users_email: joi_1.default.string()
            .email()
            .required(),
        users_password: joi_1.default.string()
            .min(6)
            .max(20)
            .required(),
        repeat_password: joi_1.default.ref('users_password'),
        users_birthyear: joi_1.default.number()
            .integer()
            .min(1900)
            .max(2013),
        users_status: joi_1.default.number()
            .min(1)
            .max(2)
            .required(),
        users_level: joi_1.default.number()
            .min(1)
            .max(3)
            .required()
    })
        .with('users_password', 'repeat_password');
    return schema.validate(data);
};
const loginValidation = (data) => {
    const schema = joi_1.default.object({
        users_entry: joi_1.default.string()
            .required(),
        users_password: joi_1.default.string()
            .min(6)
            .max(20)
            .required()
    });
    return schema.validate(data);
};
exports.default = { registerValidation, loginValidation };
