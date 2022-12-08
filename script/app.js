const showMovies = function (jsonObject) {
  let htmlstring_movies = '';
  for (const movies of jsonObject.data) {
    htmlstring_movies += `<a class="button" href="#popup1"><div class="grid-item js-movie" type="button" href="#popup1" movie_id=${movies.id}><img src="${movies.cover_url}" class="c-image"></br>${movies.title}</div></a>`;
  }
  document.querySelector('.js-movies').innerHTML = htmlstring_movies;
  listenToMovies();
};

const showMovie = function (jsonObject) {
  let htmlstring_movie = '';
  htmlstring_movie += `<div class="popup">
                <h2>${jsonObject.title}</h2>
                <a class="close" href="#">&times;</a>
                <div class="content">
                    <h5>
                      Release date: ${jsonObject.release_date}</br>
                      Director: ${jsonObject.directed_by}
                    </h5>
                    <div class="o-layout">
                      <div class="o-layout__item u-1-of-3">
                        <img src="${jsonObject.cover_url}" class="c-image">
                      </div>
                      <div class="js-grafiek o-layout__item u-2-of-3">
                      </div>
                    </div>
                </div>
            </div>`;
  document.querySelector(`.js-details`).innerHTML = htmlstring_movie;
  ShowGrafiek(jsonObject);
};

const ShowGrafiek = function(jsonObject){
console.log(jsonObject.box_office);
    let Bar1 = {
      series: [
        {
          name: 'Money made (in $)',
          data: [(jsonObject.box_office/1000000).toFixed(2)],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        width: 700
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '25%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          jsonObject.title,
        ],
      },
      yaxis: {
        title: {
          text: '$ (million)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' million';
          },
        },
      },
    };
    let chart = new ApexCharts(
      document.querySelector('.js-grafiek'),
      Bar1
    );
    chart.render();
};

const getMovies = function () {
  handleData(`https://mcuapi.herokuapp.com/api/v1/movies/`, showMovies);
};

const getMovie = function (id) {
  handleData(`https://mcuapi.herokuapp.com/api/v1/movies/${id}/`, showMovie);
};

const listenToMovies = function () {
  const buttons = document.querySelectorAll('.js-movie');
  for (const btn of buttons) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('movie_id');
      console.log(id)
      getMovie(id)
    });
  }
};

const init = function () {
  getMovies();
  getMovie();
};

document.addEventListener('DOMContentLoaded', init);