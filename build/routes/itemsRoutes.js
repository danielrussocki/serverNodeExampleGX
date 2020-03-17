"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemsController_1 = require("../controllers/itemsController");
const sessionValidation_1 = __importDefault(require("../sessionValidation"));
class ItemsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', sessionValidation_1.default.validation, itemsController_1.itemsController.newItem);
        this.router.delete('/:id', sessionValidation_1.default.validation, itemsController_1.itemsController.deleteItem);
        this.router.put('/:id', sessionValidation_1.default.validation, itemsController_1.itemsController.editItem);
        this.router.get('/:id', sessionValidation_1.default.validation, itemsController_1.itemsController.getOneItem);
    }
}
const itemsRoutes = new ItemsRoutes();
exports.default = itemsRoutes.router;
