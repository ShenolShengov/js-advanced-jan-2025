import redirect from "../router.js";
import { autorizationHeaders } from "../utils/autorization.js";
import { displayError, removeError } from "../utils/errors.js";
import validate from "../utils/validator.js";

const container = document.getElementById('container');
const baseUrl = (id) => `http://localhost:3030/data/movies/${id}`;

export default function editMovePage({id}) {
    console.log(id);
    fetch(baseUrl(id))
        .then((r) => {
            if (!r.ok) {
                throw new Error('Unexpected error!');
            }
            return r.json();
        })
        .then(({ title, img, description }) => {
            const editMovieSection = document.createElement('section');
            editMovieSection.id = 'edit-movie';
            editMovieSection.classList = 'view-section';
            editMovieSection.innerHTML = `
                <form data-id="${id}" class="text-center border border-light p-5" action="#" method="post">
                    <h1>Edit Movie</h1>
                    <div class="form-group">
                        <label for="title">Movie Title</label>
                        <input
                            id="title"
                            type="text"
                            class="form-control"
                            placeholder="Movie Title"
                            value="${title}"
                            name="title"
                        />
                    </div>
                    <div class="form-group">
                        <label for="description">Movie Description</label>
                        <input
                            class="form-control"
                            placeholder="Movie Description..."
                            name="description"
                            value="${description}"
                            id="description"
                        />
                    </div>
                    <div class="form-group">
                        <label for="imageUrl">Image url</label>
                        <input
                            id="imageUrl"
                            type="text"
                            class="form-control"
                            placeholder="Image Url"
                            value="${img}"
                            name="img"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            `;
            const editMovieForm = editMovieSection.querySelector('form');
            editMovieForm.addEventListener('submit', editMovie);
            container.appendChild(editMovieSection);
        })
        .catch((e) => displayError(e.message, container));
}

function editMovie(e) {
    e.preventDefault();
    console.log(this);
    const movieId = this.dataset.id;
    const movieData = Object.fromEntries(new FormData(this));
    removeError(this);
    if(!validate(movieData)) {
        displayError('Invalid movie data', this);
        return;
    }
    fetch(baseUrl(movieId), {
        method: 'put',
        headers: autorizationHeaders(),
        body: JSON.stringify(movieData)
    })
        .then(r => {
            if(!r.ok) {
                throw new Error('Unexpected error!');
            }
            return r.json();
        })
        .then(() => redirect('/movie-details', {id: movieId}))
        .catch(err => displayError(err.message), this);
}
