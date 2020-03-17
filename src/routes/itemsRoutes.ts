import { Router } from 'express';
import { itemsController } from '../controllers/itemsController';
import sessionValidation from '../sessionValidation';

class ItemsRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(){
        this.router.post('/', sessionValidation.validation, itemsController.newItem);
        this.router.delete('/:id', sessionValidation.validation, itemsController.deleteItem);
        this.router.put('/:id', sessionValidation.validation, itemsController.editItem);
        this.router.get('/:id', sessionValidation.validation, itemsController.getOneItem);
    }
}

const itemsRoutes = new ItemsRoutes();
export default itemsRoutes.router;