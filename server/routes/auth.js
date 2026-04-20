const router = require("express").Router()
const db = require("../db")

router.post("/register",(req,res)=>{

const {name,username,password,role}=req.body

db.query(
"INSERT INTO users(name,username,password,role) VALUES(?,?,?,?)",
[name,username,password,role],
(err)=>{
if(err) return res.json({error:"User already exists"})
res.json({message:"Account created"})
}
)

})

router.post("/login",(req,res)=>{

const {username,password}=req.body

db.query(
"SELECT * FROM users WHERE username=? AND password=?",
[username,password],
(err,data)=>{

if(err) return res.json(err)

if(data.length>0)
res.json(data[0])
else
res.json({error:"Invalid credentials"})
}
)

})

module.exports=router