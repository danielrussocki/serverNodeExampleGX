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
const User_1 = __importDefault(require("./models/User"));
const Item_1 = __importDefault(require("./models/Item"));
class SeqFunctions {
    getUserSquelizer(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({
                where: obj
            });
        });
    }
    getAllItems(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Item_1.default.findAll({
                where: {
                    items_user: _id
                }
            });
        });
    }
    insertNewItem(name, description, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Item_1.default.create({
                items_name: name,
                items_description: description,
                items_user: idUser
            });
        });
    }
    deleteAnItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Item_1.default.destroy({
                where: {
                    items_id: id
                }
            });
        });
    }
    editAnItem(id, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Item_1.default.update({
                items_name: title,
                items_description: description,
            }, {
                where: {
                    items_id: id
                }
            });
        });
    }
    getAnItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Item_1.default.findById(id);
        });
    }
}
const seqFunctions = new SeqFunctions();
exports.default = seqFunctions;
