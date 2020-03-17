"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const sessionValidation_1 = __importDefault(require("../sessionValidation"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', sessionValidation_1.default.validation, indexController_1.indexController.index);
        // this.router.post('/', sessionValidation)
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
