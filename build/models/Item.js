"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seq_1 = __importDefault(require("../seq"));
const sequelize_1 = __importDefault(require("sequelize"));
const _item = seq_1.default.define('gxtest_items', {
    items_id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true
    },
    items_name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    items_description: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    items_user: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    }
});
exports.default = _item;
