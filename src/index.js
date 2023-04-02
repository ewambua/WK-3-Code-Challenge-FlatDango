// Variables
const url = "http://localhost:3000/films"
const ul = document.querySelector('#films')
const poster = document.querySelector("#poster")
const info = document.querySelector("#showing");
const buyTicket = document.getElementById('buy-ticket')

// functions

document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();

});


function fetchMovies(){
    return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(films){
        renderMovies(films)
    })
}

function renderMovies(films){

    films.forEach(film => {
      const li = document.createElement("li");
      li.innerHTML = film.title
      li.style.cursor="pointer"
      li.dataset.id = film.id;
      ul.appendChild(li)
      li.addEventListener("click", handleClick);
    })
}

function getMovieDetails(id) {
    return fetch(url + `/${id}`)
    .then(function(response) {
      return response.json();
    })
}

function handleClick (event) {
    getMovieDetails(event.target.dataset.id)
    .then(renderMovieDetails);
}

function renderMovieDetails(films){

    poster.src = films.poster;
    poster.alt = films.title;
    info.querySelector("#title").textContent = films.title;
    info.querySelector("#runtime").textContent = films.runtime+" minutes";
    info.querySelector("#film-info").textContent = films.description;
    info.querySelector("#showtime").textContent = films.showtime;
    info.querySelector("#ticket-num").textContent = films.capacity - films.tickets_sold + " remaining tickets";
}

buyTicket.addEventListener("click", (event) => {
    const remainingTickets = document.querySelector("#ticket-num");
    event.preventDefault
    const tickets = remainingTickets.textContent.split(" ")[0];
    if (tickets > 0) {
        remainingTickets.textContent = tickets - 1;
    }  else if (tickets === 0) {
        buyTicket.textContent = 'Sold Out'
    }
})







