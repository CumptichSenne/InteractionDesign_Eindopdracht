const showMovies = function (jsonObject) {
  let htmlstring_movies = '';
  for (const movies of jsonObject.data) {
    console.log(movies.title);
    htmlstring_movies += `<div class="grid-item">${movies.title}</div>`;
  }
  document.querySelector('.js-movies').innerHTML = htmlstring_movies;
};

const showMovie = function (jsonObject) {
  let htmlstring_movie = '';
  htmlstring_movie += `<time class="c-horizon__time js-sunrise">
                    ${jsonObject.title}
                </time>`;
  document.querySelector(`.js-movie`).innerHTML = htmlstring_movie;
};

const getMovies = function () {
  handleData(`https://mcuapi.herokuapp.com/api/v1/movies/`, showMovies);
};

const getMovie = function () {
  id = 25;
  handleData(`https://mcuapi.herokuapp.com/api/v1/movies/${id}/`, showMovie);
};

const init = function () {
  getMovies();
  getMovie();
};

document.addEventListener('DOMContentLoaded', init);