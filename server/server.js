
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")

const auth = require("./routes/auth")
const admin = require("./routes/admin")
const quiz = require("./routes/quiz")
const result = require("./routes/result")

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,"../public")))

app.use("/auth",auth)
app.use("/admin",admin)
app.use("/quiz",quiz)
app.use("/result",result)

app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"../public/login.html"))
})

app.listen(5000,()=>{
console.log("Server running on http://localhost:5000")
})