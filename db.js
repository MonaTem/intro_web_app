const devconfig = require('./knexfile').development;
const knex = require('knex')(devconfig);

module.exports = knex;
