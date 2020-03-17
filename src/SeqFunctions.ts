import usuario from './models/User';
import _item from './models/Item';

class SeqFunctions {
    public async getUserSquelizer(obj: any) {
        return await usuario.findOne({
            where: obj
        });
    }
    public async getAllItems(_id:number){
        return await _item.findAll({
            where: {
                items_user: _id
            }
        });
    }
    public async insertNewItem(name: string, description: string, idUser: number){
        return await _item.create({
            items_name: name,
            items_description: description,
            items_user: idUser
        });
    }
    public async deleteAnItem(id: number | string){
        return await _item.destroy({
            where: {
                items_id: id
            }
        });
    }
    public async editAnItem(id: number | string, title: string, description: string){
        return await _item.update({
            items_name: title,
            items_description: description,
        }, {
            where: {
                items_id: id
            }
        });
    }
    public async getAnItem(id: number | string){
        return await _item.findById(id);
    }
}

const seqFunctions = new SeqFunctions();
export default seqFunctions;