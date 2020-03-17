import { Request, Response } from 'express';
import pool from '../database';
import { Reg } from '../models/Reg';
import validvalidation from '../validation';
import ciph from '../ciph';
import { Log } from '../models/Log';
import { Tok } from '../models/Tok';

class AuthController {
    public async registerUser(req: Request, res: Response):Promise<void>{
        const registerData: Reg = {
            users_username: req.body.username,
            users_name: req.body.name,
            users_email: req.body.email,
            users_password: req.body.password,
            repeat_password: req.body.repeat_password,
            users_birthyear: req.body.birthyear,
            users_status: 1,
            users_level: 1
        };
        const validUser = validvalidation.registerValidation(registerData);
        if(validUser.error){
            res.status(400).json({msg: validUser.error.message});
        } else {
            let resultado;
            pool.query('SELECT COUNT(*) FROM gxtest_users WHERE users_email = ? OR users_username = ?', [registerData.users_email, registerData.users_username], function(err, result, fields){
                if(err){
                    throw err;
                } else {
                    if(result[0]['COUNT(*)'] > 0){
                        res.status(400).json({msg: 'The account already exists!'});
                    } else if(result[0]['COUNT(*)'] == 0){
                        ciph.encrypt(registerData.users_password).then((result) => {
                            registerData.users_password = result;
                            delete registerData.repeat_password;
                            pool.query('INSERT INTO gxtest_users SET ?', [registerData], function(err, result, fields){
                                if(err) throw err;
                                res.json({msg:'User has been successfully created!'});
                            });
                        });
                    }
                    resultado = result[0]['COUNT(*)']
                }
            });
        }
    }
    public async login(req: Request, res: Response):Promise<void>{
        const { entry, password } = req.body;
        const loginData: Log = {
            users_entry: entry,
            users_password: password
        };
        const validLogin = validvalidation.loginValidation(loginData);
        if(validLogin.error){
            res.status(400).json({msg:'Rellene con datos correctos!'});
        } else {
            let userexists: string = 'SELECT COUNT(*) FROM gxtest_users WHERE users_email = ? OR users_username = ? LIMIT 1';
            pool.query(userexists, [loginData.users_entry, loginData.users_entry], function(err, result, fields){
                if(err){
                    throw err;
                } else {
                    if(result[0]['COUNT(*)'] <= 0){
                        res.status(400).json({msg: 'La cuenta ingresada no existe!'});
                    } else if(result[0]['COUNT(*)'] > 0){
                        ciph.encrypt(loginData.users_password).then((resultado) => {
                            const encPass = resultado;
                            let useraccess: string = 'SELECT *, COUNT(*) FROM gxtest_users WHERE (users_email = ? OR users_username = ?) AND users_password = ?';
                            pool.query(useraccess, [
                                loginData.users_entry,
                                loginData.users_entry,
                                encPass
                            ], function(err, result, fields){
                                if(err){
                                    throw err;
                                } else {
                                    if(result[0].users_status == 1 && result[0]['COUNT(*)'] > 0){
                                        const usuarioIn: Tok = {
                                            users_id: result[0].users_id,
                                            users_email: result[0].users_email,
                                            users_level: result[0].users_level,
                                            users_name: result[0].users_name,
                                            users_status: result[0].users_status,
                                            users_username: result[0].users_username
                                        };
                                        ciph.genToken(usuarioIn).then((_tok:string) => {
                                            console.log(_tok);
                                            // res.header('Authorization', _tok).redirect('http://localhost:3000');
                                            res.header('Authorization', _tok).json({token: _tok});
                                        });
                                    } else if(result[0].users_status == 2 && result[0]['COUNT(*)'] > 0){
                                        res.status(400).json({msg:'Inactive user, contact the system admin.'});
                                    } else if(result[0]['COUNT(*)'] == 0){
                                        res.status(400).json({msg:'Incorrect username or password'});
                                    }
                                }
                            });
                        });
                    }
                }
            });
        }
    }
}

export const authController = new AuthController();