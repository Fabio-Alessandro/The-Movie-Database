const { Sequelize } = require ("sequelize");

const sequelize = new Sequelize ("tmdb_auth", null, null, {

    host: "localhost",
    dialect: "postgres",
    logging: false
});

module.exports = sequelize;