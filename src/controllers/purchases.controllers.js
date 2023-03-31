const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchases');
const Cart = require('../models/Cart');
const Product = require('../models/Product');


const getAll = catchError(async(req, res) => {
   // Operaciones...
   let userId= req.user.id;
   const result= await Purchase.findAll({where: {userId}}, {include: [Product]})
 return res.json(result)
});

const purchaseCart= catchError(async(req,res)=>{
let userId=req.user.id;
  const cart=await Cart.findAll({
    where: {userId},
    attributes: ["quantity","productId", "userId"],
    raw: true,
   
  }, {include: [Product]})
 await Purchase.bulkCreate(cart)
 await Cart.destroy({where: {userId}})
  
  return res.json(cart)
})

module.exports = {
getAll,
purchaseCart
}