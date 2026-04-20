//public>js.quiz.js
let questions = []
let current = 0
let answers = {}
let time = 0
let timerInterval

// GET QUIZ ID
let quizId = new URLSearchParams(window.location.search).get("quiz")

if(!quizId){
quizId = localStorage.getItem("quizId")
}

console.log("Quiz ID:", quizId)

// LOAD QUESTIONS
async function loadQuiz(){

const res = await fetch("/quiz/questions/" + quizId)
questions = await res.json()

console.log("Questions:", questions)

if(!questions || questions.length === 0){
document.getElementById("question").innerText = "No questions found"
return
}

time = questions.length * 60
startTimer()

render()
renderPalette()
}

// RENDER
function render(){

let q = questions[current]

document.getElementById("question").innerText =
(current+1) + ". " + q.question

let html = ""

;["option1","option2","option3","option4"].forEach((opt,i)=>{
html += `
<label>
<input type="radio" name="opt" value="${i+1}"
${answers[current]==i+1?"checked":""}
onclick="save(${i+1})">
${q[opt]}
</label>
`
})

document.getElementById("options").innerHTML = html

updatePalette()
}

// SAVE
function save(val){
answers[current] = val
updatePalette()
}

// NAV
function next(){
if(current < questions.length-1){
current++
render()
}
}

function prev(){
if(current > 0){
current--
render()
}
}

// TIMER
function startTimer(){

timerInterval = setInterval(()=>{

time--

let min = Math.floor(time/60)
let sec = time%60

document.getElementById("timer").innerText =
`Timer: ${min}:${sec < 10 ? "0"+sec : sec}`

if(time <= 0){
clearInterval(timerInterval)
submitQuiz()
}

},1000)

}

// PALETTE
function renderPalette(){

let html = ""

for(let i=0;i<questions.length;i++){
html += `<button onclick="go(${i})" id="p${i}" class="red">${i+1}</button>`
}

document.getElementById("palette").innerHTML = html
}

// COLORS
function updatePalette(){

for(let i=0;i<questions.length;i++){

let btn = document.getElementById("p"+i)

if(i===current) btn.className="orange"
else if(answers[i]) btn.className="green"
else btn.className="red"

}
}

// GO
function go(i){
current=i
render()
}

// SUBMIT
async function submitQuiz(){

clearInterval(timerInterval)

let score = 0

questions.forEach((q,i)=>{
if(answers[i] == q.correct_option){
score++
}
})

let total = questions.length
let percentage = Math.round((score/total)*100)

// 🔥 GET USER + QUIZ
let user_id = localStorage.getItem("userId")
let quiz_id = new URLSearchParams(window.location.search).get("quiz")

// 🔥 SAVE RESULT
await fetch("/result/submit",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
user_id,
quiz_id,
score,
total,
percentage
})
})

alert("Score: " + score)

// 🔥 REDIRECT TO DASHBOARD
window.location = "student_dashboard.html"
}


// START
loadQuiz()