const request= require("supertest")
const app=require("../app")




let userId;
let token;

test("/POST CREATE", async()=>{
  const newUser={
    firstName: "javier",
    lastName : "nuñez",
    password: "1220",
    email : "javierne233@gmail.com",
    phone : "809-484-1714"
  }
  const res= await request(app)
  .post("/api/v1/users")
  .send(newUser)
  userId=res.body.id;
  expect(res.status).toBe(201)
  expect(res.body.email).toBe(newUser.email)
})


test("/POST/LOGIN", async()=>{
  const user={
  
    email : "javierne233@gmail.com",
    password: "1220"
  }
  const res= await request(app)
  .post("/api/v1/users/login")
  .send(user)
  token=res.body.token;
  expect(res.status).toBe(200)
  expect(res.body.user.email).toBe(user.email)
  expect(res.body.token).toBeDefined()
})

test("/POST/CREDENCIALES ISVALID", async()=>{
  const user={
  
    email : "javierne233@gmail.com",
    password: "122"
  }
  const res= await request(app)
  .post("/api/v1/users/login")
  .send(user)
  expect(res.status).toBe(401)
 
})


test("/GET ALL USER", async()=>{
  const res=await request(app)
  .get("/api/v1/users")
  .set("Authorization", `Bearer ${token}`)
 expect(res.status).toBe(200)
 expect(res.body).toHaveLength(2)
  
})



test("/PUT UPDATE", async()=>{

  const newUser= {
    firstName: "martin"
  }
  const res=await request(app)
  .put(`/api/v1/users/${userId}`)
  .send(newUser)
  .set("Authorization", `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(newUser.firstName)
})


test("/DELETE USER", async()=>{
  const res=await request(app)
  .delete(`/api/v1/users/${userId}`)
  .set("Authorization", `Bearer ${token}`)
  expect(res.status).toBe(204)
})

