import scheme from './scheme';
import Sequelize, { Op } from 'sequelize';

const sequelize = new Sequelize(null, null, null, {
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
