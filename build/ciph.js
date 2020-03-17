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
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Ciph {
    constructor() {
        this.AUTH_KEY = '070999';
    }
    encrypt(textToEncrypt) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = crypto_1.default.scryptSync(textToEncrypt, 'salt', 24);
            const iv = Buffer.alloc(16, 0);
            const cipher = crypto_1.default.createCipheriv('aes-192-cbc', key, iv);
            let encrypted = '';
            encrypted = cipher.update(this.AUTH_KEY, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        });
    }
    compare(textToEncrypt, textToCompare) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = crypto_1.default.scryptSync(textToEncrypt, 'salt', 24);
            const iv = Buffer.alloc(16, 0);
            const cipher = crypto_1.default.createCipheriv('aes-192-cbc', key, iv);
            let encrypted = '';
            encrypted = cipher.update(this.AUTH_KEY, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            if (encrypted == textToCompare) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    genToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let _token;
            return _token = jsonwebtoken_1.default.sign(data, this.AUTH_KEY, {
                expiresIn: 60 * 60 * 24
            });
        });
    }
}
const ciph = new Ciph();
exports.default = ciph;
