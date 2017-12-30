import Sequelize, { Op } from 'sequelize';
import scheme from './scheme';

const sequelize = new Sequelize('db', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'db.sqlite3',
  operatorsAliases: { $and: Op.and },
  logging: false,
});

scheme(sequelize);
sequelize.sync();

const { models } = sequelize;
export { sequelize, models };
