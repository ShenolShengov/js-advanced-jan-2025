import renderNavigaiton from "./utils/navigation.js";
import homePage from "./views/home.js";
import loginPage from "./views/login.js";
import logout from "./views/logout.js";
import movieDetailsPage from "./views/movie-details.js";
import registerPage from "./views/register.js";

const pathNamesViews = {
    '/': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/logout': logout,
    '/movie-details': movieDetailsPage,
};

const container = document.getElementById('container');

export default function redirect(pathname, data) {
    container.querySelectorAll('.view-section')
        .forEach(s => s.remove());
    pathNamesViews[pathname](data);
}