const express = require('express');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const router = express.Router();
const userRouter=require("./user.router")
const productimgRouter=require("./image.router");
const cartRouter = require('./cart.router');
const purchaseRouter = require('./purchase.router');
// colocar las rutas aquí

router.use("/users", userRouter)
router.use("/categorys", categoryRouter)
router.use("/products", productRouter)
router.use("/images", productimgRouter)
router.use("/carts", cartRouter)
router.use("/purchases", purchaseRouter)
module.exports = router;