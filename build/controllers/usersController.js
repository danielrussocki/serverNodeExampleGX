"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const User_1 = __importDefault(require("../models/User"));
// import { Model } from 'sequelize';
class UsersController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM gxtest_users', function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO gxtest_users set ?', [req.body], function (err, result, fields) {
                if (err)
                    throw err;
                res.json({ msg: 'User has been added' });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM gxtest_users WHERE users_id = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                res.json({ msg: 'User has been deleted successfully!' });
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM gxtest_users WHERE users_id = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result[0]);
                }
                res.status(404).json({ msg: 'User does not exists!' });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE gxtest_users SET ? WHERE users_id = ?', [req.body, id], function (err, result, fields) {
                if (err)
                    throw err;
                res.json({ msg: 'User has been updated successfully!' });
            });
        });
    }
    listSeq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_1.default.findAll().then((user) => res.json(user));
        });
    }
    getOneSeq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield User_1.default.findOne({
                where: {
                    users_id: id
                }
            }).then((user) => res.json(user));
        });
    }
}
exports.usersController = new UsersController();
