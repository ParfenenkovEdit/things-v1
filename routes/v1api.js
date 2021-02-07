const { Router } = require('express');
const thingsApi = require('./things');

const api = Router();

api.use('/things', thingsApi);

module.exports = api;
