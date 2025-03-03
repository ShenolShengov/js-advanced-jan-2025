import redirect from '../router.js';
import { autorizationHeaders } from '../utils/autorization.js';
import { displayError, removeError } from '../utils/errors.js';
import validate from '../utils/validator.js';

const container = document.getElementById('container');
const baseUrl = 'http://localhost:3030/data/movies';

export default function addMoviePage() {
    const addMovieSection = document.createElement('section');
    addMovieSection.id = 'add-movie';
    addMovieSection.classList = 'view-section';
    addMovieSection.innerHTML = `
        <form id="add-movie-form" class="text-center border border-light p-5" action="" method="post">
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input id="title" type="text" class="form-control" placeholder="Title" name="title" value="" />
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <input class="form-control" placeholder="Description" name="description" id="description" />
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" name="img" value="" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;
    const addMovieForm = addMovieSection.querySelector('#add-movie-form');
    addMovieForm.addEventListener('submit', addMovie);
    container.appendChild(addMovieSection);
}

function addMovie(e) {
    e.preventDefault();
    const movieData = Object.fromEntries(new FormData(this));
    removeError(this);
    if (!validate(movieData)) {
        displayError('Invalid movie data', this);
        return;
    }
    fetch(baseUrl, {
        method: 'post',
        headers: autorizationHeaders(),
        body: JSON.stringify(movieData),
    })
        .then(() => redirect('/'))
        .catch(() => displayError('Unexpected error!', this));
}
