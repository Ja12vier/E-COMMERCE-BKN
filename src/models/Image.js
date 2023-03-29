const { DataTypes } = require('sequelize')

const sequelize = require('../utils/connection')
 // En Mayúsculas y singular      // en minúsculas y singular
const Image = sequelize.define('image', {
// Definimos las columnas aquí
url: {
type: DataTypes.TEXT,
allowNull: false 
},
filename: {
  type: DataTypes.STRING,
  allowNull: false 
  }
  //productId
  
},{
  timestamps: false
}

);
module.exports = Image;
