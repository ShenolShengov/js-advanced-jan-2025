import redirect from '../router.js';
import { isLoggedIn } from '../user.js';

const container = document.getElementById('container');
const baseUrl = 'http://localhost:3030/data/movies';

export default function homePage() {
    const homePage = document.createElement('section');
    homePage.id = 'home-page';
    homePage.classList = 'view-section';
    homePage.innerHTML = `
        <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40">
            <img
                src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
                class="img-fluid"
                alt="Responsive image"
                style="width: 150%; height: 200px"
            />
            <h1 class="display-4">Movies</h1>
            <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
        </div>

        <h1 class="text-center">Movies</h1>
        ${
            isLoggedIn()
                ? `<section id="add-movie-button" class="user">
                      <a href="#" class="btn btn-warning">Add Movie</a>
                  </section> `
                : ''
        }

        <section id="movie">
            <div class="mt-3">
                <div class="row d-flex d-wrap">
                    <ul id="movies-list" class="card-deck d-flex justify-content-center"></ul>
                </div>
            </div>
        </section>
    `;
    const movieList = homePage.querySelector('#movies-list');

    renderMovies(movieList);

    movieList.addEventListener('click', showMoviesDedatils);

    container.appendChild(homePage);
}

function showMoviesDedatils(e) {
    e.preventDefault();
    if(!e.target.matches('.btn-info')) {
        return;
    }
    const movie = e.target.closest('li');
    redirect('/movie-details', {id: movie.dataset.id});
}

function renderMovies(movieList) {
    fetch(baseUrl)
        .then((r) => r.json())
        .then((data) => {
            data.forEach(({ title, img, _id}) => {
                const movie = document.createElement('li');
                movie.classList = 'card mb-4';
                movie.dataset.id = _id;
                movie.innerHTML = `
                    <img class="card-img-top" src="${img}" alt="Card image cap" width="400" />
                    <div class="card-body">
                        <h4 class="card-title">${title}</h4>
                        <a href="#"> </a>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-info">Details</button>
                    </div>
                `;
                movieList.appendChild(movie);
            });
        });
}
