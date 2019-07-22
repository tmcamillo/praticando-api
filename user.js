const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let user = {};
let name_first = document.querySelector('#name-first')
let name_last = document.querySelector('#name-last')
let email = document.querySelector('#email')
let form_update = document.querySelector('#update')

form_update.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
})

let getData = () => {
    let myHeader = {
        headers: {
            'content-type': 'application/json'
        }
    };
    let myInit = {
        method: 'GET',
        headers: myHeader,
        mode: 'cors',
        cache: 'default'
    };
    

    fetch(`https://cors-anywhere.herokuapp.com/https://reqres.in/api/users/${id}`, myInit)
    .then(function(response){
        return response.json();
    })
    .then(function(res){
        user = res.data;
        displayInfosUser();
    
    })
}
getData();

let displayInfosUser = () => {
    // document.querySelector('.body').innerHTML = `
    // <h1>${res.data.last_name} - ${res.data.first_name}</h1><br>
    // <p>${res.data.email}</p>
    // <img src='${res.data.avatar}'></img>
    // `
    // ;
    name_first.value = user.first_name;
    name_last.value = user.last_name;
    email.value = user.email;
};

let updateUser = () => {
    let myHeader = {
        headers: {
            'content-type': 'application/json'
        }
    };
    
    let myInit = {
        method: 'PUT',
        headers: myHeader,
        mode: 'cors',
        cache: 'default'
    };

    fetch(`https://cors-anywhere.herokuapp.com/https://reqres.in/api/users/${id}`, myInit)
    .then(function(response){
       return response.json();
    })
    .then(function(res){
        console.log(res)
    
    })
}

let validateForm = () => {
    if(name_first && name_last && email) {
        updateUser();
    };
}

