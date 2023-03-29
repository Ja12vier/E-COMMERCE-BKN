const request=require("supertest")
const app=require("../app");
const Product = require("../models/Product");
require("../models")

let cartId;

let token;

beforeAll(async()=>{
  const newCredenciales={
           email : "test@gmail.com",
            password: "1234"

  }
  const res= await request(app)
  .post("/api/v1/users/login")
  .send(newCredenciales)
  token=res.body.token;

})

test("/POST/CART", async()=>{
  const product= await Product.create(
    {
      title: "samsung a 10",
      description: "teleono con potencia",
      price: 201
    }
  )
  const newCart={
    productId: product.id,
    quantity: 2
  }
  const res=await request(app)
  .post("/api/v1/carts")
  .send(newCart)
  .set("Authorization", `Bearer ${token}`)
  await product.destroy()
  cartId=res.body.id;
  expect(res.status).toBe(201)
  expect(res.body.quantity).toBe(newCart.quantity)
})

test("/GET/CARTS", async()=>{
  const res= await request(app)
  .get("/api/v1/carts")
  .set("Authorization", `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("/PUT/CARTS",async()=>{
  const newCart={
    
    quantity: 1
  }
  const res=await request(app)
  .put(`/api/v1/carts/${cartId}`)
  .send(newCart)
  .set("Authorization", `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body.quantity).toBe(newCart.quantity)

})

test("/DELETE/CARTS",async()=>{
  const res=await request(app)
  .delete(`/api/v1/carts/${cartId}`)
  .set("Authorization", `Bearer ${token}`)
  expect(res.status).toBe(204)
})