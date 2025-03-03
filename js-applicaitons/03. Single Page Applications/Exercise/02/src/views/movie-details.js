import redirect from '../router.js';
import { isLoggedIn, userId } from '../user.js';
import { displayError } from '../utils/errors.js';
import deleteMovie from './delete-movie.js';
import likeMovie from './like-movie.js';

const container = document.getElementById('container');
const baseUrl = (id) => `http://localhost:3030/data/movies/${id}`;

export default function movieDetailsPage({ id }) {
    const loggedUserId = userId();
    fetch(baseUrl(id))
        .then((r) => {
            if (!r.ok) {
                throw new Error('Unexpected error!');
            }
            return r.json();
        })
        .then(({ title, img, description, _ownerId, _id }) => {
            const isLoggedUserOwner = loggedUserId === _ownerId;
            const movieDetailsSection = document.createElement('section');
            movieDetailsSection.id = 'movie-example';
            movieDetailsSection.classList = 'view-section';
            movieDetailsSection.innerHTML = `
                <div class="container">
                    <div class="row bg-light text-dark">
                        <h1>Movie title: ${title}</h1>

                        <div class="col-md-8">
                            <img class="img-thumbnail" src="${img}" alt="Movie" />
                        </div>
                        <div class="col-md-4 text-center">
                            <h3 class="my-3">Movie Description</h3>
                            <p>${description}</p>
                            ${
                                isLoggedUserOwner
                                    ? `<a class="btn btn-danger" data-id="${_id}" href="/delete-movie">Delete</a>
                                        <a class="btn btn-warning" data-id="${_id}" href="/edit-movie">Edit</a>`
                                    : ``
                            }
                            ${
                                isLoggedIn()
                                    ? ` <a class="btn btn-primary" data-id="${_id}" href="/like-movie">Like</a>`
                                    : ''
                            }
                           
                            
                        </div>
                    </div>
                </div>
            `;
            attachEditEvent(movieDetailsSection);
            attachDeleteEvent(movieDetailsSection);
            attachLikeEvent(movieDetailsSection);
            container.appendChild(movieDetailsSection);
        })
        .catch((e) => displayError(e.message, container));
}

function attachLikeEvent(movieDetailsSection) {
    const likeBtn = movieDetailsSection.querySelector('a[href="/like-movie"]');
    likeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const movieId = e.target.dataset.id;
        likeMovie(movieId);
    });
}

function attachDeleteEvent(movieDetailsSection) {
    const deleteBtn = movieDetailsSection.querySelector('a[href="/delete-movie"]');
    deleteBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const movieId = e.target.dataset.id;
        deleteMovie(movieId);
    });
}

function attachEditEvent(movieDetailsSection) {
    const editBtn = movieDetailsSection.querySelector('a[href="/edit-movie"]');
    editBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const movieId = e.target.dataset.id;
        redirect('/edit-movie', {id: movieId});
    });
}