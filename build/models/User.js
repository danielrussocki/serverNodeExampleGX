"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seq_1 = __importDefault(require("../seq"));
const sequelize_1 = __importDefault(require("sequelize"));
const usuario = seq_1.default.define('gxtest_users', {
    users_id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true
    },
    users_name: {
        type: sequelize_1.default.STRING
    },
    users_password: {
        type: sequelize_1.default.STRING
    }
});
exports.default = usuario;
