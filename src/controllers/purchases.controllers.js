const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchases');
const Cart = require('../models/Cart');


const getAll = catchError(async(req, res) => {
   // Operaciones...
   let userId= req.user.id;
   const result= await Purchase.findAll({where: {userId}})
 return res.json(result)
});

const purchaseCart= catchError(async(req,res)=>{
let userId=req.user.id;
  const cart=await Cart.findAll({
    where: {userId},
    attributes: ["quantity","productId", "userId"],
    raw: true
  })
 await Purchase.bulkCreate(cart)
 await Cart.destroy({where: {userId}})
  
  return res.json(cart)
})

module.exports = {
getAll,
purchaseCart
}