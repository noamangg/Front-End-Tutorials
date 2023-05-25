let body = document.body;
let countSpan = document.querySelector(".quiz-info .count span");
let bullets = document.querySelector(".bullets");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let results = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestion() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      let questionObject = JSON.parse(this.responseText);
      let qCount = questionObject.length;

      // Create Bullets + Set Questions Count
      createBullets(qCount);

      // Add Questions Data
      addQuestionsData(questionObject[currentIndex]);

      countDown(5, qCount);

      body.addEventListener("click", function (e) {
        setTimeout(function () {
          if (e.target.tagName.toLowerCase() === "label") {
            if (currentIndex < qCount) {
              console.log("Count ", qCount);
              console.log("Current ", currentIndex);
              let rightAnswer = questionObject[currentIndex].right_answer;
              currentIndex++
              if (e.target.textContent === rightAnswer) rightAnswers++;
              if (currentIndex < qCount) {
                addQuestionsData(questionObject[currentIndex]);
              }
              else {
                showResult(qCount);
              }



              handelBullets();
              clearInterval(countdownInterval);
              countDown(5, qCount);

            }
          }

        }, 500);
      });

    }
  };

  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}
getQuestion();
function createBullets(num) {
  countSpan.innerHTML = num;
  let spans = document.createElement("span");
  spans.className = "spans";
  for (let i = 0; i < num; i++) {
    let bullate = document.createElement("span");
    spans.appendChild(bullate);

    if (i === 0) bullate.className = "on";
  }

  bullets.prepend(spans);
}

function addQuestionsData(obj) {
  quizArea.innerHTML = "";
  // Add The Question
  let h2 = document.createElement("h2");
  h2.textContent = obj.title + " ?";
  quizArea.appendChild(h2);

  // Add Answers To The HTML
  answersArea.innerHTML = "";
  for (let i = 1; i <= 4; i++) {
    let li = document.createElement("li");
    li.className = "answer";
    let input = document.createElement("input");
    input.type = "radio";
    input.setAttribute("name", "answers");
    input.setAttribute("id", `answer_${i}`);
    let label = document.createElement("label");
    label.setAttribute("for", input.getAttribute("id"));
    label.textContent = obj[`answer_${i}`];
    li.appendChild(input);
    li.appendChild(label);
    answersArea.prepend(li);
  }

}
function handelBullets() {
  let bulletsSpan = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpan);
  arrayOfSpans.forEach((span, index) => {
    if (index === currentIndex) {
      span.className = "on";
    }
  })
}

function showResult(totalQuestions) {
  let word = `<span class ="good">good</span>`;
  if (rightAnswers === totalQuestions)
    word = `<span class ="perfect">perfect</span>`;
  else if (rightAnswers <= totalQuestions / 4)
    word = `<span class ="bad">bad</span>`;
  let resultBox = document.createElement("div");
  resultBox.className = "result-box";
  let h2 = document.createElement("h2");
  h2.innerHTML = `Your Result IS ${rightAnswers} Points`;
  let p = document.createElement("p");
  p.innerHTML = `${rightAnswers}/${totalQuestions} you are ${word}`;

  let button = document.createElement("button");
  button.onclick = reloadPage;
  button.textContent = "Take The Exam Again";
  resultBox.appendChild(h2);
  resultBox.appendChild(p);
  resultBox.appendChild(button);

  results.appendChild(resultBox);
  results.style.display = "flex";

  countdownElement.remove();
}
function reloadPage() {
  window.location.reload();
}
function countDown(duration, count) {
  let minutes, seconds;
  addZeroes = (ele) => ele <= 9 ? `0${ele}` : ele;

  countdownInterval = setInterval(function () {
    minutes = parseInt(duration / 60);
    minutes = addZeroes(minutes);
    seconds = parseInt(duration % 60);
    seconds = addZeroes(seconds);

    countdownElement.innerHTML = `${minutes}:${seconds}`;
    if (--duration < 0) {
      clearInterval(countdownInterval);
      document.querySelector("label").click();
    }

  }, 800);
}