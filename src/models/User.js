
const { DataTypes } = require('sequelize')
const bcrypt= require("bcrypt")

const sequelize = require('../utils/connection')
 // En Mayúsculas y singular      // en minúsculas y singular
const User = sequelize.define('user', {
// Definimos las columnas aquí
firstName: {
type: DataTypes.STRING,
allowNull: false 
},

lastName: {
  type: DataTypes.STRING,
  allowNull: false 
  },

email: {
    type: DataTypes.STRING,
    allowNull: false ,
    unique: true
    },

password: {
      type: DataTypes.STRING,
      allowNull: false 
      },

phone: {
  type: DataTypes.STRING,
  allowNull: false 
        }
});

User.beforeCreate(async(user)=>{
 const encritePassword= await bcrypt.hash(user.password, 10)
  user.password=encritePassword
})

User.prototype.toJSON=function(){
  const values=Object.assign({}, this.get())
  delete values.password;
  return values;
}
module.exports = User;
