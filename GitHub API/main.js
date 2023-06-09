let inputF = document.querySelector('input#input-text');
let repoContainer = document.querySelector('ul.result-box');
let flag = true;

inputF.addEventListener("keydown", function (e) {
    if (e.keyCode === 13 && flag) {
        console.log(inputF.value);
        console.log(`check user value = ${checkUser(inputF.value)}`)
        if(checkUser(inputF.value))
        getRepo(inputF.value);
        inputF.value = "";
    }
})

function checkUser(username) {
    let flag = true;
    fetch(`https://api.github.com/users/${username}/repos`).then((res) => {
        // flag = (res.status === 200 && res.ok === true);
        flag = false;
    })
    console.log(flag);
    return flag;
}


function getRepo(username) {
    fetch(`https://api.github.com/users/${username}/repos`).then((res) => {
        console.log(res, ' outside');
        if (this.status === 200 && this.ok === true) {
            return res.json();
        }
        else {
            alert('Enter a valid repo');
            flag = false;
            return false;
        }
        return res.json();
    }).then(repos => {
        // my code here
        if (repos)
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
