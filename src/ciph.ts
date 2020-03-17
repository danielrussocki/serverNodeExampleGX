import crypto from 'crypto';
import { Tok } from './models/Tok';
import jwt from 'jsonwebtoken';

class Ciph {
    private AUTH_KEY: string = '070999';
    public async encrypt(textToEncrypt: string):Promise<string>{
        const key = crypto.scryptSync(textToEncrypt, 'salt', 24);
        const iv =  Buffer.alloc(16, 0);
        const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
        let encrypted = '';
        encrypted = cipher.update(this.AUTH_KEY, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    public async compare(textToEncrypt: string, textToCompare:string):Promise<boolean>{
        const key = crypto.scryptSync(textToEncrypt, 'salt', 24);
        const iv =  Buffer.alloc(16, 0);
        const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
        let encrypted = '';
        encrypted = cipher.update(this.AUTH_KEY, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        if(encrypted == textToCompare){
            return true;
        } else {
            return false;
        }
    }
    public async genToken(data: Tok){
        let _token;
        return _token = jwt.sign(data, this.AUTH_KEY, {
            expiresIn: 60 * 60 * 24
        });
    }
}

const ciph = new Ciph();
export default ciph;