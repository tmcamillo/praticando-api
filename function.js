// GET '/users/user/1'
// POST '/users/user/'
// PUT '/users/user/1'
// DELETE '/users/user/1'

let header = {
    headers: {
        'content-type': 'application/json'
    }
}

let myInit = { 
    method: 'GET',
    headers: header,
    mode: 'cors',
    cache: 'default' 
}

let people = {}

// let fetchPeople = () => {
//     fetch('https://cors-anywhere.herokuapp.com/https://swapi.co/api/people/1/', myInit)
//     .then(function(response) {
//         return response.json()      
//     })
//     .then(function(response) {
//         people = response
//         showPeople()
//     })
// }

// let showPeople = () => {
//     let div_people = document.querySelector('.people')
//     div_people.innerHTML = people.name

//     let list = `<ul>`

//     people.films.map(f => {
//         console.log(f)
//         list += `<li>${f}</li>`
//     })

//     list += `</ul>`

//     div_people.innerHTML += list
// }

// fetchPeople()

let peoples = []
let next = ''
let previous = ''

let fetchPeoples = (button) => {
    let url = ''

    if (button === 'next') url = next
    else if (button === 'previous') url = previous
    else url = 'https://swapi.co/api/people/'

    console.log(button)

    fetch(`https://cors-anywhere.herokuapp.com/${url}`, myInit)
    .then(function(response) {
        return response.json()      
    })
    .then(function(response) {
        peoples = response.results
        next = response.next
        previous = response.previous

        showPeoples()
        showButtons()
    })
}

fetchPeoples()

let showPeoples = () => {
    let div_people = document.querySelector('.people')
    div_people.innerHTML = ''

    let list = `<ul>`

    peoples.map(p => {
        console.log
        list += `<li>${p.name}</li>`
    })

    list += `</ul>`

    div_people.innerHTML += list
}

let showButtons = () => {
    let div_buttons = document.querySelector('.buttons')
    let buttons = ''

    if (next) {
        buttons += `<a href='#' class='btn-change-page' id='next'>Next</a>`
    }

    if (previous) {
        buttons += `<a href='#' class='btn-change-page' id='previous'>Previous</a>`
    }

    div_buttons.innerHTML = buttons

    let btns = document.querySelectorAll('.btn-change-page')

    Array.from(btns).map(b => {
        b.addEventListener('click', function() {
            fetchPeoples(this.id)
        })
    })
}

// let xhr = new XMLHttpRequest();

// xhr.open('GET', 'https://swapi.co/api/people/1/');

// xhr.responseType = 'json';
// xhr.setRequestHeader('Content-Type', 'application/json');

// xhr.send();

// xhr.onload = function() {
//     console.log(xhr.response);
        // Aqui continua seu codico com o retorno
// };