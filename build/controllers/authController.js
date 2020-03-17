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
const validation_1 = __importDefault(require("../validation"));
const ciph_1 = __importDefault(require("../ciph"));
class AuthController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerData = {
                users_username: req.body.username,
                users_name: req.body.name,
                users_email: req.body.email,
                users_password: req.body.password,
                repeat_password: req.body.repeat_password,
                users_birthyear: req.body.birthyear,
                users_status: 1,
                users_level: 1
            };
            const validUser = validation_1.default.registerValidation(registerData);
            if (validUser.error) {
                res.status(400).json({ msg: validUser.error.message });
            }
            else {
                let resultado;
                database_1.default.query('SELECT COUNT(*) FROM gxtest_users WHERE users_email = ? OR users_username = ?', [registerData.users_email, registerData.users_username], function (err, result, fields) {
                    if (err) {
                        throw err;
                    }
                    else {
                        if (result[0]['COUNT(*)'] > 0) {
                            res.status(400).json({ msg: 'The account already exists!' });
                        }
                        else if (result[0]['COUNT(*)'] == 0) {
                            ciph_1.default.encrypt(registerData.users_password).then((result) => {
                                registerData.users_password = result;
                                delete registerData.repeat_password;
                                database_1.default.query('INSERT INTO gxtest_users SET ?', [registerData], function (err, result, fields) {
                                    if (err)
                                        throw err;
                                    res.json({ msg: 'User has been successfully created!' });
                                });
                            });
                        }
                        resultado = result[0]['COUNT(*)'];
                    }
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { entry, password } = req.body;
            const loginData = {
                users_entry: entry,
                users_password: password
            };
            const validLogin = validation_1.default.loginValidation(loginData);
            if (validLogin.error) {
                res.status(400).json({ msg: 'Rellene con datos correctos!' });
            }
            else {
                let userexists = 'SELECT COUNT(*) FROM gxtest_users WHERE users_email = ? OR users_username = ? LIMIT 1';
                database_1.default.query(userexists, [loginData.users_entry, loginData.users_entry], function (err, result, fields) {
                    if (err) {
                        throw err;
                    }
                    else {
                        if (result[0]['COUNT(*)'] <= 0) {
                            res.status(400).json({ msg: 'La cuenta ingresada no existe!' });
                        }
                        else if (result[0]['COUNT(*)'] > 0) {
                            ciph_1.default.encrypt(loginData.users_password).then((resultado) => {
                                const encPass = resultado;
                                let useraccess = 'SELECT *, COUNT(*) FROM gxtest_users WHERE (users_email = ? OR users_username = ?) AND users_password = ?';
                                database_1.default.query(useraccess, [
                                    loginData.users_entry,
                                    loginData.users_entry,
                                    encPass
                                ], function (err, result, fields) {
                                    if (err) {
                                        throw err;
                                    }
                                    else {
                                        if (result[0].users_status == 1 && result[0]['COUNT(*)'] > 0) {
                                            const usuarioIn = {
                                                users_id: result[0].users_id,
                                                users_email: result[0].users_email,
                                                users_level: result[0].users_level,
                                                users_name: result[0].users_name,
                                                users_status: result[0].users_status,
                                                users_username: result[0].users_username
                                            };
                                            ciph_1.default.genToken(usuarioIn).then((_tok) => {
                                                console.log(_tok);
                                                // res.header('Authorization', _tok).redirect('http://localhost:3000');
                                                res.header('Authorization', _tok).json({ token: _tok });
                                            });
                                        }
                                        else if (result[0].users_status == 2 && result[0]['COUNT(*)'] > 0) {
                                            res.status(400).json({ msg: 'Inactive user, contact the system admin.' });
                                        }
                                        else if (result[0]['COUNT(*)'] == 0) {
                                            res.status(400).json({ msg: 'Incorrect username or password' });
                                        }
                                    }
                                });
                            });
                        }
                    }
                });
            }
        });
    }
}
exports.authController = new AuthController();
