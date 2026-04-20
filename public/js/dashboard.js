// LOAD SUBJECTS
async function loadSubjects(){

const res = await fetch("/admin/subjects")
const data = await res.json()

let s = document.getElementById("filterSubject")

s.innerHTML = `<option value="">All Subjects</option>`

data.forEach(d=>{
s.innerHTML += `<option value="${d.id}">${d.name}</option>`
})

}

// LOAD TOPICS
async function loadTopics(subjectId){

let t = document.getElementById("filterTopic")

t.innerHTML = `<option value="">All Topics</option>`

if(!subjectId) return

const res = await fetch("/admin/topics/"+subjectId)
const data = await res.json()

data.forEach(d=>{
t.innerHTML += `<option value="${d.id}">${d.name}</option>`
})

}

// LOAD QUIZZES
async function loadQuizzes(){

const res = await fetch("/quiz/today")
const quizzes = await res.json()

renderQuiz(quizzes)

}

// RENDER QUIZ
function renderQuiz(quizzes){

let html=""

quizzes.forEach(q=>{

html += `
<div style="
background:#0f172a;
padding:20px;
border-radius:10px;
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:15px;
">

<div>
<h3>${q.subject} - ${q.topic}</h3>
<p>${q.duration} min</p>
</div>

<button onclick="startQuiz(${q.id})"
style="
background:#9333ea;
color:white;
padding:10px 20px;
border:none;
border-radius:5px;
cursor:pointer;
">
Start Quiz
</button>

</div>
`
})

document.getElementById("quizList").innerHTML = html
}

// FILTER FUNCTION
async function filterQuiz(){

const subject = document.getElementById("filterSubject").value

const res = await fetch("/quiz/today")
let quizzes = await res.json()

if(subject){
quizzes = quizzes.filter(q=>q.subject_id == subject)
}

renderQuiz(quizzes)

}

// ✅ START QUIZ (FULLY FIXED)
function startQuiz(id){
console.log("Starting quiz:", id)

localStorage.setItem("quizId", id)

// ALWAYS pass correct ID
window.location.href = "quiz.html?quiz=" + id
}
// LOAD STATS
async function loadStats(){

let studentId = localStorage.getItem("userId")

if(!studentId){
console.log("No user logged in")
return
}

const res = await fetch("/result/overall/"+studentId)
const data = await res.json()

let total = data.length
let sum = 0
let best = 0

data.forEach(q=>{
sum += q.percentage
if(q.percentage > best) best = q.percentage
})

let avg = total ? sum/total : 0

document.getElementById("total").innerText = total
document.getElementById("avg").innerText = Math.round(avg)+"%"
document.getElementById("best").innerText = best+"%"

}

// INIT
document.addEventListener("DOMContentLoaded",()=>{

loadSubjects()
loadQuizzes()
loadStats()

document.getElementById("filterSubject").addEventListener("change",function(){
loadTopics(this.value)
})

})

// LOAD SUBJECT FILTER (OPTIONAL SECOND FILTER)
async function loadSubjectFilter(){

const res = await fetch("/admin/subjects")
const subjects = await res.json()

let html = `<option value="">All Subjects</option>`

subjects.forEach(s=>{
html += `<option value="${s.id}">${s.name}</option>`
})

document.getElementById("subjectFilter").innerHTML = html
}

// LOAD TOPICS FILTER
async function filterTopics(){

const subjectId = document.getElementById("subjectFilter").value

const res = await fetch("/admin/topics/"+subjectId)
const topics = await res.json()

let html = `<option value="">All Topics</option>`

topics.forEach(t=>{
html += `<option value="${t.id}">${t.name}</option>`
})

document.getElementById("topicFilter").innerHTML = html

}