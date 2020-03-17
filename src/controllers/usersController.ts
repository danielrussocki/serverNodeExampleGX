import { Request, Response } from 'express';
import pool from '../database';
import usuario from '../models/User';
// import { Model } from 'sequelize';

class UsersController {
    public async list(req: Request, res: Response):Promise<void>{
        await pool.query('SELECT * FROM gxtest_users', function(err, result, fields){
            if(err) throw err;
            res.json(result);
        });
    }
    public async create(req: Request, res: Response):Promise<void>{
        console.log(req.body);
        await pool.query('INSERT INTO gxtest_users set ?', [req.body], function(err, result, fields){
            if(err) throw err;
            res.json({msg: 'User has been added'});
        });
    }
    public async delete(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM gxtest_users WHERE users_id = ?', [id], function(err, result, fields){
            if(err) throw err;
            res.json({msg: 'User has been deleted successfully!'});
        });
    }
    public async getOne(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('SELECT * FROM gxtest_users WHERE users_id = ?', [id], function(err, result, fields){
            if(err) throw err;
            if(result.length > 0){
                return res.json(result[0]);
            }
            res.status(404).json({msg: 'User does not exists!'});
        });
    }
    public async update(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE gxtest_users SET ? WHERE users_id = ?', [req.body, id], function(err, result, fields){
            if(err) throw err;
            res.json({msg:'User has been updated successfully!'});
        });
    }
    public async listSeq(req: Request, res: Response):Promise<void>{
        await usuario.findAll().then((user: any) => res.json(user));
    }
    public async getOneSeq(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await usuario.findOne({
            where: {
                users_id: id
            }
        }).then((user: any) => res.json(user));
    }
}

export const usersController = new UsersController();