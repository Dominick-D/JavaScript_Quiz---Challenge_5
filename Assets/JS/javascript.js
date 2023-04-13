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
  ];

  console.log(questions[0]);
var quizContainer= document.getElementById('quiz');
var resultContainer= document.getElementById('result');
var highScoresContainer= document.getElementById('high-scores');
var startButton= document.getElementById('start-button');
var timerElement = document.getElementById("timer");
timerElement.style.display = 'none';
startButton.addEventListener('click', startQuiz);

var currentQuestion= 0;
var score= 0;
var timeLeft= 120;
let timerId;

highScoresContainer.style.display = "none";

function startQuiz(){
    startButton.style.display= 'none';
    timerElement.style.display= 'block';
    quizContainer.style.display= 'block';
    displayQuestion();
    //updateTimerDisplay();
    timerId= setInterval(updateTimer,1000);
}

function displayQuestion(){
    /*var question = questions[currentQuestion];
    var questions=question.choices.map(choice => `<li><button onclick="checkAnswer('${choice}')">${choice}</button></li>`).join('');
    var questionHTML= `
    <h2>${question.question}</h2>
    <ul>`"'
      ${questions} </ul>` ;
      quizContainer.innerHTML = questionHTML; */
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
    timerElement.textContent = `Time Left: ${timeLeft}`;
    if(timeLeft<=0){endQuiz();}
}


function endQuiz(){
    clearInterval(timerId);
    quizContainer.style.display= 'none';
    highScoresContainer.style.display = "block";
    resultContainer.textContent=`Your final score is ${score}.`;
}

document.getElementById("submit").addEventListener("click", function(e){
  e.preventDefault();
  console.log(document.getElementById("initials").value);
  var temp = {
    initials: document.getElementById("initials").value,
    score: score
  };
  var iniArr = JSON.parse(localStorage.getItem("scores")) || [];

  iniArr.push(temp);
  localStorage.setItem("scores", JSON.stringify(iniArr));
})

