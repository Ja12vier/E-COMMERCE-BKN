const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT= require("../utils/verifyJWT")

const User = express.Router();

User.route('/')
    .get(verifyJWT,getAll)
    .post(create);

User.route('/login')
 .post(login)

User.route('/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT,update);

module.exports = User;