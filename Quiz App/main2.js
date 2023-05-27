
let containerBox = document.querySelector(".container-index");
window.localStorage.JsonFile = "html_questions.json";
containerBox.addEventListener("click", function(a) {
    if(a.target.tagName.toLowerCase() === "img" || a.target.tagName.toLowerCase() == "p" || a.target.parentElement.tagName.toLowerCase() === "a")
    window.localStorage.JsonFile = `${a.target.parentElement.dataset.type}_questions.json`;
    else if(a.target.tagName.toLowerCase() === "a") {
    window.localStorage.JsonFile = `${a.target.dataset.type}_questions.json`;
    }
})


