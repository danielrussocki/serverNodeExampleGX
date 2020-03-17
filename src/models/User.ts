import sequal from '../seq';
import Sequelize from 'sequelize';

const usuario: any = sequal.define('gxtest_users', {
    users_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    users_name: {
        type: Sequelize.STRING
    },
    users_password: {
        type: Sequelize.STRING
    }
});

export default usuario;