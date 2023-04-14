var questions = [
    {
      question: "What is the output of 1+2+'3'?",
      choices: ["33", "123", "6", "Error"],
      answer: "33"
    },
    {
      question: "What is the correct syntax to declare a variable in JavaScript?",
      choices: ["var variableName;", "v variableName;", "variable variableName;", "declare variableName;"],
      answer: "var variableName;"
    },
    {
      question: "What is the output of 2*6+'5'?",
      choices: ["'125'", "'17'", "'12'", "'Error'"],
      answer: "'17'"
    },
    {
      question: "What is the correct way to write a JavaScript array?",
      choices: ["var colors = ['red', 'green', 'blue'];", "var colors = 'red', 'green', 'blue';", "var colors = {'red', 'green', 'blue'};", "var colors = (1:'red', 2:'green', 3:'blue');"],
      answer: "var colors = ['red', 'green', 'blue'];"
    },
    {
      question: "What does the 'this' keyword refer to in JavaScript?",
      choices: ["The current function", "The parent function", "The global object", "The object that owns the current function"],
      answer: "The object that owns the current function"
    }
  ];  console.log(questions[0]);

var quizContainer= document.getElementById('quiz');
var resultContainer= document.getElementById('result');
var highScoresContainer= document.getElementById('high-scores');
var startButton= document.getElementById('start-button');
var timerElement = document.getElementById("timer");
var timeLeft= 60;
var currentQuestion= 0;
var score= 0;
let timerId;

timerElement.style.display = 'none';
highScoresContainer.style.display = "none";

startButton.addEventListener('click', startQuiz);

function startQuiz(){
    startButton.style.display= 'none';
    timerElement.style.display= 'block';
    quizContainer.style.display= 'block';
    displayQuestion();
    timerId= setInterval(updateTimer,1000);
}

function displayQuestion(){
      document.getElementById("quiz").textContent = "";
      console.log(questions[currentQuestion]);
      var q = document.createElement("h4");
      q.textContent = questions[currentQuestion].question;
      document.getElementById("quiz").append(q);
      for(var i=0; i< questions[currentQuestion].choices.length;i++)
      {
        var btn = document.createElement("button");
        btn.textContent = questions[currentQuestion].choices[i];
        btn.setAttribute("data-answer", questions[currentQuestion].choices[i]);
        btn.onclick = checkAnswer;
        document.getElementById("quiz").append(btn);
      }
}

function checkAnswer(){
   var answer = this.getAttribute("data-answer");
   var question = questions[currentQuestion];
    if (answer===question.answer){
         score = score + 10;
         resultContainer.textContent= 'Correct!';
    } else{
         timeLeft -= 10;
         resultContainer.textContent= 'Wrong!';
    }
     currentQuestion++;
    if(currentQuestion < questions.length){
        displayQuestion();
    } else{endQuiz();}
}


function updateTimer(){
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}!`;
    if(timeLeft<=0){endQuiz();}
}

function endQuiz(){
    clearInterval(timerId);
    quizContainer.style.display= 'none';
    highScoresContainer.style.display = "block";
    resultContainer.textContent=`Your final score is ${score}.`;
}

function saveScore(event){
  event.preventDefault();
  
  var initialsInput = document.getElementById("initials").value;
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
  highScores.push({
    initials: initialsInput,
    score: score
  });
  
  highScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  
  var scoresList = document.getElementById("score-list");
  scoresList.innerHTML = "";
  
  for (var i = 0; i < highScores.length; i++) {
    var scoreItem = document.createElement("li");
    scoreItem.textContent = highScores[i].initials + " - " + highScores[i].score;
    scoresList.appendChild(scoreItem);}
};

document.getElementById("submit").addEventListener("click", saveScore); 
document.getElementById("clear-scores").addEventListener("click", function() {
  localStorage.removeItem("highScores");
  document.getElementById("high-scores-table").innerHTML = "";
});
