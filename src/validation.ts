import Joi from '@hapi/joi';
import { Reg } from './models/Reg';
import { Log } from './models/Log';

const registerValidation = (data: Reg) => {
    const schema = Joi.object({
        users_name: Joi.string()
            .min(2)
            .required(),
        users_username: Joi.string()
            .min(6)
            .max(20)
            .required(),
        users_email: Joi.string()
            .email()
            .required(),
        users_password: Joi.string()
            .min(6)
            .max(20)
            .required(),
        repeat_password: Joi.ref('users_password'),
        users_birthyear: Joi.number()
            .integer()
            .min(1900)
            .max(2013),
        users_status: Joi.number()
            .min(1)
            .max(2)
            .required(),
        users_level: Joi.number()
            .min(1)
            .max(3)
            .required()
    })
    .with('users_password', 'repeat_password');
    return schema.validate(data);
};

const loginValidation = (data: Log) => {
    const schema = Joi.object({
        users_entry: Joi.string()
            .required(),
        users_password: Joi.string()
            .min(6)
            .max(20)
            .required()
    });
    return schema.validate(data);
}

export default { registerValidation, loginValidation };