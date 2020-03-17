import { Request, Response } from 'express';
import seqFunctions from '../SeqFunctions';
import jwt from 'jsonwebtoken';

class IndexController {
    public index(req: Request, res: Response){
        // res.json({posts: {title: 'my first post', description: 'random data you shouldnt access'}});
        const theToken: string = req.headers.authorization as string;
        let newToken: any = jwt.decode(theToken);
        let idUser = newToken.users_id;
        seqFunctions.getAllItems(idUser).then(result => {
            res.send(result);
        });
    }
}

export const indexController = new IndexController();