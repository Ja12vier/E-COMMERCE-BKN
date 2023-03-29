

const request=require("supertest")
const app=require("../app")
require("../models/Category")

let token;
let categoryId;

beforeAll(async()=>{
  const newCredenciales={
           email : "test@gmail.com",
            password: "1234",

  }
  const res= await request(app)
  .post("/api/v1/users/login")
  .send(newCredenciales)
  token=res.body.token;

})


test("/POST CATEGORY", async()=>{
  const newCategory= {name: "tech"}
  const res=await request(app)
  .post("/api/v1/categorys")
  .send(newCategory)
  .set("Authorization", `Bearer ${token}`)
  categoryId=res.body.id;
  expect(res.status).toBe(201)
  expect(res.body.name).toBe(newCategory.name)
})

test("/GET/CATEGORY", async()=>{
  const res=await request(app)
  .get("/api/v1/categorys")
  .set("Authorization", `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})
test("/DELETE/CATEGORY", async()=>{
  const res=await request(app)
  .delete(`/api/v1/categorys/${categoryId}`)
  .set("Authorization", `Bearer ${token}`)
  expect(res.status).toBe(204)

})