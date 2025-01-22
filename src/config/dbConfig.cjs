require('dotenv').config();
module.exports = {
  development: {
    use_env_variable: 'DB_CLOUD_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  },
  production: {
    use_env_variable: 'DB_CLOUD_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  }
};
