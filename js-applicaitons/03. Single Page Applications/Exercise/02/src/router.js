import addMoviePage from "./views/add-movie.js";
import deleteMovie from "./views/delete-movie.js";
import editMovePage from "./views/edit-movie.js";
import homePage from "./views/home.js";
import likeMovie from "./views/like-movie.js";
import loginPage from "./views/login.js";
import logout from "./views/logout.js";
import movieDetailsPage from "./views/movie-details.js";
import registerPage from "./views/register.js";

const pathNamesViews = {
    '/': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/logout': logout,
    '/add-movie': addMoviePage,
    '/edit-movie': editMovePage,
    '/movie-details': movieDetailsPage,
};

const container = document.getElementById('container');

export default function redirect(pathname, data) {
    container.querySelectorAll('.view-section')
        .forEach(s => s.remove());
    console.log(pathname);
    pathNamesViews[pathname](data);
}