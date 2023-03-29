const { getAll, create, remove } = require('../controllers/image.controllers');
const express = require('express');
const upload= require("../utils/multer")
const image = express.Router();

image.route('/')
.get(getAll)
.post(upload.single("image"),create)
image.route('/:id')
.delete(remove)
module.exports = image;