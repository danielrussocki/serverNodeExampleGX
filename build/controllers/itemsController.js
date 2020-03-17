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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SeqFunctions_1 = __importDefault(require("../SeqFunctions"));
class ItemsController {
    newItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            const userEncoded = req.headers.authorization;
            let userDecoded = jsonwebtoken_1.default.decode(userEncoded);
            let idUser = userDecoded.users_id;
            // console.log(userDecoded);
            SeqFunctions_1.default.insertNewItem(title, description, idUser).then(result => {
                res.json({ msg: 'Datos insertados correctamente' });
            }, err => {
                res.status(400).json({ _error: 'Error al insertar datos' });
            });
        });
    }
    deleteItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            SeqFunctions_1.default.deleteAnItem(id).then(result => {
                res.json({ msg: 'Datos eliminados correctamente' });
            }, err => {
                res.status(400).json({ _error: 'Error al eliminar datos' });
            });
        });
    }
    editItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, description } = req.body;
            SeqFunctions_1.default.editAnItem(id, title, description).then(result => {
                res.json({ msg: 'Datos actualizados correctamente!' });
            }, err => {
                console.log(err);
                res.status(400).json({ _error: 'Error al actualizar datos' });
            });
        });
    }
    getOneItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            SeqFunctions_1.default.getAnItem(id).then(result => {
                if (result != null) {
                    return res.send(result);
                }
                res.status(404).json({ _error: 'Item no existe!' });
            }, err => {
                res.status(400).json({ _error: 'Error obteniendo los datos' });
            });
        });
    }
}
exports.itemsController = new ItemsController();
