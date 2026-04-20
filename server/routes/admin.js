const router = require("express").Router()
const db = require("../db")

// ================= ADD SUBJECT =================
router.post("/subject",(req,res)=>{
db.query(
"INSERT INTO subjects(name) VALUES(?)",
[req.body.name],
()=>res.json("Subject added")
)
})

// ================= GET SUBJECTS (FIX) =================
router.get("/subjects",(req,res)=>{
db.query(
"SELECT * FROM subjects",
(err,data)=>{
if(err) return res.json(err)
res.json(data)
}
)
})

// ================= ADD TOPIC =================
router.post("/topic",(req,res)=>{
db.query(
"INSERT INTO topics(subject_id,name) VALUES(?,?)",
[req.body.subject_id,req.body.name],
()=>res.json("Topic added")
)
})

// ================= GET TOPICS (FIX) =================
router.get("/topics/:subjectId",(req,res)=>{
db.query(
"SELECT * FROM topics WHERE subject_id=?",
[req.params.subjectId],
(err,data)=>{
if(err) return res.json(err)
res.json(data)
}
)
})

// ================= ADD QUESTION =================
router.post("/question",(req,res)=>{

const q=req.body

db.query(
`INSERT INTO questions
(subject_id,topic_id,question,option1,option2,option3,option4,correct_option)
VALUES(?,?,?,?,?,?,?,?)`,
[
q.subject_id,
q.topic_id,
q.question,
q.option1,
q.option2,
q.option3,
q.option4,
q.correct_option
],
()=>res.json("Question added")
)

})

// ================= CREATE QUIZ (ONLY SMALL FIX) =================
router.post("/quiz",(req,res)=>{

const {subject_id, topic_id, duration, date} = req.body

db.query(
"INSERT INTO quizzes(subject_id,topic_id,duration,quiz_date) VALUES(?,?,?,?)",
[subject_id,topic_id,duration,date],
(err,result)=>{

if(err) return res.json(err)

const quizId = result.insertId

// 🔥 FIX: auto link questions
db.query(
"SELECT id FROM questions WHERE subject_id=? AND topic_id=?",
[subject_id,topic_id],
(err,questions)=>{

if(questions.length === 0){
return res.json("No questions for this topic")
}

questions.forEach(q=>{
db.query(
"INSERT INTO quiz_questions(quiz_id,question_id) VALUES(?,?)",
[quizId,q.id]
)
})

res.json("Quiz created")

})

})
})

module.exports = router