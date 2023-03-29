const { DataTypes } = require('sequelize')

const sequelize = require('../utils/connection')
 // En Mayúsculas y singular      // en minúsculas y singular
const Product = sequelize.define('product', {
// Definimos las columnas aquí
title: {
type: DataTypes.STRING,
allowNull: false 
},
description: {
  type: DataTypes.TEXT,
  allowNull: false 
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false 
    },
  
});
module.exports = Product;
