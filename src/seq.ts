import { Sequelize } from 'sequelize';
import keys from './keys';

const sequal = new Sequelize({
    database: keys.database.database,
    username: keys.database.user,
    password: keys.database.password,
    dialect: 'mysql',
    host: keys.database.host,
    define: {
        timestamps: false
    }
});

sequal
    .authenticate()
    .then(()=>console.log('Sequalize connection has been successfully completed!'))
    .catch(err=>console.error('Unable to connect to the database with sequalize:', err));

export default sequal;