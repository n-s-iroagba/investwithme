import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('investwithme', 'root', '97chocho', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
});

export default sequelize;

