function getQuestion() {
    let myRequest = new XMLHttpRequest();


    myRequest.onreadystatechange = function() {
        if(this.status === 200 && this.readyState === 4)
        {
            let questionObject = JSON.parse(this.responseText);
            console.log(questionObject);
        }
    }
    myRequest.open("GET","html_questions.json", true);
    myRequest.send();

}
getQuestion();