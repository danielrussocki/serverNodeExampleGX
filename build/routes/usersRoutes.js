"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
class UsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usersController_1.usersController.list);
        this.router.get('/:id', usersController_1.usersController.getOne);
        this.router.get('/seq/all', usersController_1.usersController.listSeq);
        this.router.get('/seq/:id', usersController_1.usersController.getOneSeq);
        this.router.post('/', usersController_1.usersController.create);
        this.router.delete('/:id', usersController_1.usersController.delete);
        this.router.put('/:id', usersController_1.usersController.update);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
