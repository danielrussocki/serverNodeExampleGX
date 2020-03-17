import sequal from '../seq';
import Sequelize from 'sequelize';

const _item: Sequelize.Model<any,any> = sequal.define('gxtest_items', {
    items_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    items_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    items_description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    items_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default _item;