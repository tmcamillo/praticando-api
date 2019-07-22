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

users = [];
let next = '';
let previous = '';
let actual_page = '';
let total_pages = '';


let getData = (button) => {
    let url ='';
    
    if (button === 'next') url = `https://reqres.in/api/users?page=${actual_page+1}`
    else if (button === 'previous') url = `https://reqres.in/api/users?page=${actual_page-1}`
    else url = 'https://reqres.in/api/users'

    fetch(`https://cors-anywhere.herokuapp.com/${url}`, myInit)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        users = response.data;
        actual_page = response.page;
        total_pages = response.total_pages;
        displayUsers();
        displayPagination();
    })
}

getData();

let displayUsers = () => {
    let div_users = document.querySelector('.users')
    div_users.innerHTML = '';
    list = `<ul>`
    users.map(u =>  {
        list += `<li><a href='user.html?id=${u.id}'>${u.last_name}</a> </li>`
    })
    list += `</ul>`

    div_users.innerHTML += list
}

let displayPagination = () => {
    let div_btns = document.querySelector('.buttons');
    let buttons = '';
    if(actual_page < total_pages){
        buttons += `<a href='#' class='btn-change-page' id='next'>Next</a>`
    }
    if(actual_page > 1){
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