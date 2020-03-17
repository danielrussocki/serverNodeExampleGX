import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import seqFunctions from '../SeqFunctions';

class ItemsController {
    public async newItem(req: Request, res: Response):Promise<void>{
        const { title, description } = req.body;
        const userEncoded: string = req.headers.authorization as string;
        let userDecoded: any = jwt.decode(userEncoded);
        let idUser: number = userDecoded.users_id as number;
        // console.log(userDecoded);
        seqFunctions.insertNewItem(title, description, idUser).then(result =>{
            res.json({msg: 'Datos insertados correctamente'});
        }, err => {
            res.status(400).json({_error: 'Error al insertar datos'});
        });
    }
    public async deleteItem(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        seqFunctions.deleteAnItem(id).then(result => {
            res.json({msg: 'Datos eliminados correctamente'});
        }, err => {
            res.status(400).json({_error: 'Error al eliminar datos'});
        });
    }
    public async editItem(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        const { title, description } = req.body;
        seqFunctions.editAnItem(id, title, description).then(result => {
            res.json({msg: 'Datos actualizados correctamente!'});
        }, err => {
            console.log(err);
            res.status(400).json({_error: 'Error al actualizar datos'});
        });
    }
    public async getOneItem(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        seqFunctions.getAnItem(id).then(result => {
            if(result != null){
                return res.send(result);
            }
            res.status(404).json({_error: 'Item no existe!'});
        }, err => {
            res.status(400).json({_error: 'Error obteniendo los datos'});
        });
    }
}

export const itemsController = new ItemsController();