let myHeader = {
    headers: {
        'content-type': 'application/json'
    }
}

let myInit = {
    method: 'GET',
    headers: myHeader,
    mode: 'cors',
    cache: 'default'
};

let pokemons = [];
let next = '';
let previous = '';

let getData = (button) => {
    let url ='';
    if (button === 'next') url = next
    else if (button === 'previous') url = previous
    else url = 'https://pokeapi.co/api/v2/pokemon/'

    fetch(`https://cors-anywhere.herokuapp.com/${url}`, myInit)
    .then(function(response){
    return response.json();
    })
    .then(function(response){
        console.log(response);
        pokemons = response.results;
        next = response.next;
        previous = response.previous;
        displayData();
        displayPagination();
    })
}

getData();

let displayData = () => {
    let div_names = document.querySelector('.pokemon')
    div_names.innerHTML = ''
    list = `<ul>`
    pokemons.map(p => {
        list += `<li>${p.name}</li>`
    });
    list += `</ul>`

    div_names.innerHTML += list
}

let displayPagination = () => {
    let div_btns = document.querySelector('.buttons');
    let buttons = ''

    if (next) {
        buttons += `<a href='#' class='btn-change-page' id='next'>Next</a>`
    }
    if (previous) {
        buttons += `<a href='#' class='btn-change-page' id='previous'>Previous</a>`
    }
    div_btns.innerHTML = buttons;

    let arr_btn = document.querySelectorAll('.btn-change-page');
    
    Array.from(arr_btn).map(b => {
        b.addEventListener('click', function() {
            getData(this.id)
        })
    })
};