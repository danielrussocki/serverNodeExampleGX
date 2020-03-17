import { Router } from 'express';
import { indexController } from '../controllers/indexController';
import sessionValidation from '../sessionValidation';

class IndexRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/', sessionValidation.validation, indexController.index);
        // this.router.post('/', sessionValidation)
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;