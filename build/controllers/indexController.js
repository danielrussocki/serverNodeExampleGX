"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SeqFunctions_1 = __importDefault(require("../SeqFunctions"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class IndexController {
    index(req, res) {
        // res.json({posts: {title: 'my first post', description: 'random data you shouldnt access'}});
        const theToken = req.headers.authorization;
        let newToken = jsonwebtoken_1.default.decode(theToken);
        let idUser = newToken.users_id;
        SeqFunctions_1.default.getAllItems(idUser).then(result => {
            res.send(result);
        });
    }
}
exports.indexController = new IndexController();
