const constants = require('./constants');
const knexConfig= require('./db.config');

const pgdb = require('knex')(knexConfig['development'],{client: 'pg'})

module.exports = {
    constants,
    pgdb,
    connectionString:knexConfig['connectionString']
};