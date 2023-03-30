const User = require('../models/User');
const sequelize = require('../utils/connection');
require("../models/User")
require("../models/Category")
require("../models/index")
require("../models/Product")
require("../models/Image")


const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({
            firstName: "test",
            lastName: "user",
            email : "test@gmail.com",
            password: "1234",
            phone: "8094841714"

        })
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();