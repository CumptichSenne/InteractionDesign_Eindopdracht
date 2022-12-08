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

const ShowGrafiek = function (jsonObject) {
  console.log(jsonObject.box_office);
  let Bar1 = {
    series: [
      {
        name: 'Money made (in $)',
        data: [(jsonObject.box_office / 1000000).toFixed(2)],
      },
    ],
    chart: {
      type: 'bar',
      height: '400px',
      width: '800px',
      toolbar: {
        show: false,
      },
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
      fontSize: '14px',
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [jsonObject.title],
      labels: {
        style: {
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      title: {
        text: '$ (million)',
      },
      labels: {
        style: {
          fontSize: '10px',
        },
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
    responsive: [
      {
        breakpoint: 1600,
        options: {
          chart: { height: '300px', width: '600px' },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: { height: '200px', width: '400px' },
        },
      },
      {
        breakpoint: 600,
        options: {
          chart: { height: '200px', width: '300px' },
        },
      },
      {
        breakpoint: 500,
        options: {
          chart: { height: '200px', width: '200px' },
        },
      },
    ],
  };
  let chart = new ApexCharts(document.querySelector('.js-grafiek'), Bar1);
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
      console.log(id);
      getMovie(id);
    });
  }
};

const init = function () {
  getMovies();
  getMovie();
};

document.addEventListener('DOMContentLoaded', init);
