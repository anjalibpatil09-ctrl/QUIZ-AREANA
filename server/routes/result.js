const router = require("express").Router()
const db = require("../db")

// ✅ SAVE RESULT (FIXED FIELD NAMES)
router.post("/submit",(req,res)=>{

const r = req.body

db.query(
`INSERT INTO results(user_id,quiz_id,score,total,percentage,status)
VALUES(?,?,?,?,?,?)`,
[
r.user_id,          // 🔥 FIXED
r.quiz_id,
r.score,            // 🔥 FIXED
r.total,
r.percentage,
"Completed"
],
(err)=>{
if(err) return res.json(err)
res.json("saved")
}
)

})

// ✅ GET OVERALL RESULTS (ALREADY GOOD, JUST SMALL FIX)
router.get("/overall/:student",(req,res)=>{

db.query(
`SELECT 
subjects.name AS subject,
topics.name AS topic,
results.score,
results.percentage
FROM results
JOIN quizzes ON results.quiz_id = quizzes.id
JOIN subjects ON quizzes.subject_id = subjects.id
JOIN topics ON quizzes.topic_id = topics.id
WHERE results.user_id=?`,
[req.params.student],
(err,data)=>{
if(err) return res.json(err)
res.json(data)
}
)

})

module.exports = router