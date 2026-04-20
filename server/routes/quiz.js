const router = require("express").Router()
const db = require("../db")

// ================= TODAY QUIZZES =================
router.get("/today",(req,res)=>{

db.query(
`SELECT quizzes.id,
subjects.name AS subject,
topics.name AS topic,
quizzes.duration,
quizzes.quiz_date,
quizzes.subject_id,
quizzes.topic_id
FROM quizzes
JOIN subjects ON quizzes.subject_id = subjects.id
JOIN topics ON quizzes.topic_id = topics.id`,
(err,data)=>{
if(err) return res.json(err)
res.json(data)
}
)

})

// ================= GET QUESTIONS =================
router.get("/questions/:quizId",(req,res)=>{

db.query(
`SELECT q.id,q.question,q.option1,q.option2,q.option3,q.option4,q.correct_option
FROM questions q
JOIN quiz_questions qq ON q.id = qq.question_id
WHERE qq.quiz_id=?`,
[req.params.quizId],
(err,data)=>{
if(err) return res.json(err)
res.json(data)
}
)

})

module.exports = router