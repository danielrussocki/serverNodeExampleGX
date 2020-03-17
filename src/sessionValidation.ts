import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class SessionValidation {
    public validation(req: Request, res: Response, next: NextFunction){
        const token = req.headers['authorization'];
        if(!token) return res.status(401).send('Access denied!');
        try {
            jwt.verify(token, '070999');
            next();
        } catch(err){
            res.status(400).send('Invalid token!');
        }
    }
}

const sessionValidation = new SessionValidation();
export default sessionValidation;