let inputF = document.querySelector('input#input-text');
let repoContainer = document.querySelector('ul.result-box');


inputF.addEventListener("keydown", function(e) {
    if(e.keyCode === 13) {
        getRepo(inputF.value);
        inputF.value = "";
    }
})


function getRepo(username) {
    fetch(`https://api.github.com/users/${username}/repos`).then((res) => {
        return res.json();
    }).then(repos => {
        // my code here
        repos.forEach((repo) => {
            createLi(repo)
        })
    })
}

function createLi(repo) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    let p = document.createElement("p");

    a.href = repo.url;
    a.textContent = repo.name;
    a.target = '_blank';
    p.textContent = `+${repo.stargazers_count} Stars`;

    li.appendChild(a);
    li.appendChild(p);
    repoContainer.appendChild(li);
}
