import { autorizationHeaders } from '../utils/autorization.js';
import { displayError } from '../utils/errors.js';

const baseUrl = 'http://localhost:3030/data/likes';
const movieLikeCountUrl = (id) =>
    `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`;

export default function likeMovie(id) {
    const movieDetailsSection = document.getElementById('movie-example');
    fetch(baseUrl, {
        method: 'post',
        headers: autorizationHeaders(),
        body: JSON.stringify({
            movieId: id,
        }),
    })
        .then((r) => {
            if (!r.ok) {
                throw new Error('Error occursed when performing like on moive');
            }
            showMovieLikeCount(movieDetailsSection, id);
        })
        .catch((err) => displayError(err.message), movieDetailsSection);
}

function showMovieLikeCount(movieDetailsSection, id) {
    const likeButton = movieDetailsSection.querySelector('.btn-primary');
    fetch(movieLikeCountUrl(id))
        .then((r) => {
            if (!r.ok) {
                throw new Error('Unexpected error!');
            }
            return r.text();
        })
        .then((likes) => {
            const showLikeSpan = document.createElement('span');
            showLikeSpan.classList = 'enrolled-span';
            showLikeSpan.textContent = `Liked ${likes}`;
            likeButton.after(showLikeSpan);
            likeButton.remove();
        })
        .catch((err) => displayError(err.message), movieDetailsSection);
}
