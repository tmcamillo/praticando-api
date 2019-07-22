let user_form = document.querySelector('#user');
let name = document.querySelector('#name');
let job = document.querySelector('#job');


user_form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateData();
})

let validateData = () => {
    if (name.value && job.value) {
        createUser()
    }
}

let createUser = () => {
    let myHeader = {
        headers: {
            'content-type': 'application/json'
        }
    }

    let data = {
        name: name.value,
        job: job.value
    }

    let myInit = {
        method: 'POST',
        headers: myHeader,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data)
    }

    fetch(`https://cors-anywhere.herokuapp.com/https://reqres.in/api/users`, myInit)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        window.location.href = `user.html?id=${response.id}`
    })
}