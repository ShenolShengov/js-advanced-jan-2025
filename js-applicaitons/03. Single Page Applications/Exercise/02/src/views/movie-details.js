import redirect from '../router.js';
import { isLoggedIn, userId } from '../user.js';
import deleteMovie from './delete-movie.js';
import likeMovie from './like-movie.js';

const container = document.getElementById('container');
const baseUrl = (id) => `http://localhost:3030/data/movies/${id}`;
const movieLikesUrl = (id) => `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`;
const userLikeOnMovieUrl = (userId, movieId) =>
    `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`;

export default function movieDetailsPage({ id }) {
    Promise.all([fetchMovieData(id), fetchMovieLikes(id), fetIsUserLiked(userId(), id)]).then(
        ([movieData, movieLikes, isUserAlreadyLiked]) => {
            // console.log('Movie data: ', movieData);
            // console.log('Movie likes; ', movieLikes);
            // console.log('Is user like movie: ', isUserAlreadyLiked);
            renderMovieDetails(movieData, movieLikes, isUserAlreadyLiked);
        }
    );
    // .catch((e) => displayError(e.message, container));
}

function renderMovieDetails(movieData, movieLikes, isUserAlreadyLiked) {
    const { title, img, description, _ownerId, _id } = movieData;
    const isLoggedUserOwner = userId() === _ownerId;
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
                    <h3 class="my-3 ">Movie Description</h3>
                    <p>${description}</p>
                    ${
                        isLoggedUserOwner
                            ? `<a class="btn btn-danger" id="${_id}" href="/delete-movie">Delete</a>
                                        <a class="btn btn-warning" id="${_id}" href="/edit-movie">Edit</a>`
                            : ``
                    }
                    ${
                        !isUserAlreadyLiked && !isLoggedUserOwner && isLoggedIn()
                            ? `<a class="btn btn-primary" id="${_id}" href="/like-movie">Like</a>`
                            : ``
                    }
                    <span class="enrolled-span">Liked ${movieLikes}</span>
                </div>
            </div>
        </div>
    `;
    attachEditEvent(movieDetailsSection);
    attachDeleteEvent(movieDetailsSection);
    attachLikeEvent(movieDetailsSection);
    container.appendChild(movieDetailsSection);
}

function fetchMovieData(id) {
    return fetch(baseUrl(id)).then((r) => {
        if (!r.ok) {
            throw new Error('Unexpected error!');
        }
        return r.json();
    });
}

function fetIsUserLiked(userId, id) {
    if (!userId) return new Promise((resolve, _) => resolve(false));
    return fetch(userLikeOnMovieUrl(userId, id))
        .then((r) => {
            onBadResponse(r);
            return r.json();
        })
        .then((d) => {
            return new Promise((resolve, _) => {
                return resolve(d && d.length > 0);
            });
        });
}

function fetchMovieLikes(id) {
    return fetch(movieLikesUrl(id)).then((r) => {
        onBadResponse(r);
        return r.text();
    });
}

function onBadResponse(r) {
    if (!r.ok) {
        throw new Error('Unexpected error!');
    }
}

function attachLikeEvent(movieDetailsSection) {
    const likeBtn = movieDetailsSection.querySelector('a[href="/like-movie"]');
    likeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const movieId = e.target.id;
        likeMovie(movieId);
    });
}

function attachDeleteEvent(movieDetailsSection) {
    const deleteBtn = movieDetailsSection.querySelector('a[href="/delete-movie"]');
    deleteBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const movieId = e.target.id;
        deleteMovie(movieId);
    });
}

function attachEditEvent(movieDetailsSection) {
    const editBtn = movieDetailsSection.querySelector('a[href="/edit-movie"]');
    editBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const movieId = e.target.id;
        redirect('/edit-movie', { id: movieId });
    });
}
