let body = document.body;
let countSpan = document.querySelector(".quiz-info .count span");
let bullets = document.querySelector(".bullets");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let results = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// Set Options
let bulletsCount = 1;
let rightAnswers = 0;
let countdownInterval;
// In Seconds
let durationTime = 5;
let arrQuestions;
let qQuestions = 15;
let qCount = qQuestions;
function getQuestion() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      let questionObject = JSON.parse(this.responseText);

      let questionLength = questionObject.length;
      // let qCount = questionObject.length;

      // Create Bullets + Set Questions Count
      createBullets(qCount);

      arrQuestions = new Array(questionObject.length);
      // Add Questions Data
      for (let i = 0; i < arrQuestions.length; i++)
        arrQuestions[i] = i;

      let random = generateRandom(questionLength, arrQuestions);
      addQuestionsData(questionObject[random]);
      arrQuestions = arrQuestions.filter((e) => e !== random);
      qCount--;
      countDown(durationTime);

      body.addEventListener("click", function (e) {
        setTimeout(function () {
          if (e.target.tagName.toLowerCase() === "label") {
            let rightAnswer = questionObject[random].right_answer;
            if (e.target.textContent === rightAnswer) rightAnswers++;


            if (qCount--) {
              random = generateRandom(questionLength, arrQuestions);
              addQuestionsData(questionObject[random]);
              arrQuestions = arrQuestions.filter((e) => e !== random);
            }
            else {
              showResult(qQuestions);
              clearInterval(countdownInterval);
            }
            handelBullets();
            clearInterval(countdownInterval);
            countDown(durationTime);


          }

        }, 250);
      });

    }
  };

  // create  afuntion that's return a string
  myRequest.open("GET", localStorage.JsonFile, true);
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
  let questionArray = new Array(Object.keys(obj).length - 2);
  for (let i = 0; i < questionArray.length; i++)
    questionArray[i] = i + 1;

  for (let i = 0; i < Object.keys(obj).length - 2; i++) {
    let random = generateRandom(Object.keys(obj).length - 1, questionArray);
    let li = document.createElement("li");
    li.className = "answer";
    let input = document.createElement("input");
    input.type = "radio";
    input.setAttribute("name", "answers");
    input.setAttribute("id", `answer_${random}`);
    let label = document.createElement("label");
    label.setAttribute("for", input.getAttribute("id"));
    label.textContent = obj[`answer_${random}`];
    li.appendChild(input);
    li.appendChild(label);
    answersArea.prepend(li);
    questionArray = questionArray.filter((e) => e !== random);
  }

}
function handelBullets() {
  let bulletsSpan = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpan);
  arrayOfSpans.forEach((span, index) => {
    if (index === bulletsCount) {
      span.className = "on";
    }
  })
  bulletsCount++;
}
function reloadPage() {
  window.location.reload();
}
function openMenu() {
  window.location.href = "index.html"
}
function showResult(totalQuestions) {
  let word = `<span class ="bad">bad</span>`;
  if (rightAnswers === totalQuestions)
    word = `<span class ="perfect">perfect</span>`;
  else if (rightAnswers <= totalQuestions / 2 && rightAnswers > totalQuestions / 3)
    word = `<span class ="good">good</span>`;
  else if (rightAnswers <= totalQuestions / 3 && rightAnswers > totalQuestions / 4)
    word = `<span class ="fine">fine</span>`;
  else if (rightAnswers <= totalQuestions / 4)
    word = `<span class ="bad">bad</span>`;
  let resultBox = document.createElement("div");
  resultBox.className = "result-box";
  let h2 = document.createElement("h2");
  h2.innerHTML = `Your Result Is ${rightAnswers} Points`;
  let p = document.createElement("p");
  p.innerHTML = `${rightAnswers}/${totalQuestions} you are ${word}`;

  let button = document.createElement("button");
  button.onclick = reloadPage;
  button.textContent = "Take The Exam Again";

  let button2 = document.createElement("button");
  button2.onclick = openMenu;
  button2.textContent = "Take Another Exam";

  let a = document.createElement("a");
  a.href = "https://github.com/noamangg";
  a.target = "_blank";

  let img = document.createElement("img");
  img.src = "imgs/icons8-github-100.png";
  img.alt = "github";

  let pLink = document.createElement("p");
  pLink.textContent = "Made With 🎉 By Noaman";

  a.appendChild(img);
  a.appendChild(pLink);
  resultBox.appendChild(h2);
  resultBox.appendChild(p);
  resultBox.appendChild(button);
  resultBox.appendChild(button2);
  resultBox.appendChild(a);


  results.appendChild(resultBox);
  results.style.display = "flex";

  countdownElement.remove();
}
function countDown(duration) {
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
      if (qCount >= 0) {
        document.querySelector("label").click();
      }
    }

  }, 800);
}
function generateRandom(max, arr) {
  let random = Math.floor(Math.random() * max);
  while (!arr.includes(random)) {
    random = Math.floor(Math.random() * max)
  }

  return random;
}
// let aee = [1,2];
// for(let i = 0; i < aee.length; i++) {
//   let random = generateRandom(3,aee)
//   console.log(random);
//   aee = aee.filter((e) => e !== random);
//   console.log(aee)
// }
