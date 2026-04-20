//public>js>admin.js
// ================= ADD FUNCTIONS =================

// ADD SUBJECT
async function addSubject(){
const name=document.getElementById("subjectName").value

await fetch("/admin/subject",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({name})
})

alert("Subject Added")
loadSubjects()
}

// ------------------------

// ADD TOPIC
async function addTopic(){
const subject_id=document.getElementById("topicSubject").value
const name=document.getElementById("topicName").value

await fetch("/admin/topic",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({subject_id,name})
})

alert("Topic Added")
}

// ------------------------

// ADD QUESTION
async function addQuestion(){

const subject_id=document.getElementById("questionSubject").value
const topic_id=document.getElementById("questionTopic").value

await fetch("/admin/question",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
subject_id,
topic_id,
question:document.getElementById("questionText").value,
option1:document.getElementById("opt1").value,
option2:document.getElementById("opt2").value,
option3:document.getElementById("opt3").value,
option4:document.getElementById("opt4").value,
correct_option:document.getElementById("correctOption").value
})
})

alert("Question Added")
}

// ------------------------

// CREATE QUIZ (FIXED)
async function createQuiz(){

await fetch("/admin/quiz",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
subject_id:document.getElementById("quizSubject").value,
topic_id:document.getElementById("quizTopic").value,
duration:document.getElementById("quizDuration").value,
date:document.getElementById("quizDate").value
})
})

alert("Quiz Created WITH QUESTIONS")
}

// ================= DROPDOWNS =================

// LOAD SUBJECTS (ONLY ONE VERSION NOW)
async function loadSubjects(){

const res = await fetch("/admin/subjects")
const subjects = await res.json()

const dropdowns = ["topicSubject","questionSubject","quizSubject"]

dropdowns.forEach(id=>{
let select = document.getElementById(id)
if(!select) return

select.innerHTML = `<option value="">Select Subject</option>`

subjects.forEach(s=>{
select.innerHTML += `<option value="${s.id}">${s.name}</option>`
})
})

}

// LOAD TOPICS
async function loadTopics(subjectId, targetId){

if(!subjectId) return

const res = await fetch("/admin/topics/"+subjectId)
const topics = await res.json()

let select = document.getElementById(targetId)

select.innerHTML = `<option value="">Select Topic</option>`

topics.forEach(t=>{
select.innerHTML += `<option value="${t.id}">${t.name}</option>`
})

}

// ================= EVENT LISTENERS =================

document.addEventListener("DOMContentLoaded",()=>{

loadSubjects()

document.getElementById("questionSubject")?.addEventListener("change",function(){
loadTopics(this.value,"questionTopic")
})

document.getElementById("quizSubject")?.addEventListener("change",function(){
loadTopics(this.value,"quizTopic")
})

})