const request=require("supertest")
const app=require("../app");
const Image = require("../models/Image");
require("../models/Product")
require("../models/index")




let productId;
let token;

beforeAll(async()=>{
  const credential={
    email : "test@gmail.com",
    password: "1234",
  }
  const res=await request(app)
  .post("/api/v1/users/login")
  .send(credential)
  token=res.body.token;
})

test("/POST/ CREARTE", async()=>{
  const newProduct={
    title: "samsung a 10",
    description: "teleono con potencia",
    price: 201
  }
  const res=await request(app)
  .post("/api/v1/products")
  .send(newProduct)
  .set("Authorization", `Bearer ${token}`)
   productId=res.body.id;
  expect(res.status).toBe(201)
  expect(res.body.title).toBe(newProduct.title)
})


test("/GET PRODUCT", async()=>{
  const res=await request(app).get("/api/v1/products")
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("/PUT/PRODUCT", async()=>{
  const newProduct={
    title: "samsung a 10"
  }
  const res=await request(app)
  .put(`/api/v1/products/${productId}`)
  .send(newProduct)
  .set("Authorization", `Bearer ${token}`)
  productId=res.body.id;
  expect(res.status).toBe(200)
  expect(res.body.title).toBe(newProduct.title)
})

test("/POST/PRODUCTS/:ID/IMAGES", async()=>{
const image=await Image.create(
 { url: "jksoooo",
  filename: "jasdd.js"}
)
  const res=await request(app)
  .post(`/api/v1/products/${productId}/images`)
  .send([image.id])
  await image.destroy()
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("/DELETE/PRODUCT", async()=>{
  const res=await request(app)
  .delete(`/api/v1/products/${productId}`)
  .set("Authorization", `Bearer ${token}`)
  expect(res.status).toBe(204)
})


