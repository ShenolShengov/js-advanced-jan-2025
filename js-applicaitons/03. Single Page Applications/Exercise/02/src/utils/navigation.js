import redirect from '../router.js';
import { email, isLoggedIn } from '../user.js';

const container = document.getElementById('container');

export default function renderNavigaiton() {
    container.querySelector('nav')?.remove();
    const nav = document.createElement('nav');
    nav.classList = 'navbar navbar-expand-lg navbar-dark bg-dark';
    nav.innerHTML = `
        <a class="navbar-brand text-light" href="/">Movies</a>
        <ul class="navbar-nav ml-auto">
            ${isLoggedIn() ? loggedUserItems() : guestItems()}
        </ul>
    `;

    nav.addEventListener('click', handleNavigation);

    container.prepend(nav);
}

function handleNavigation(e) {
    e.preventDefault();
    if(!e.target.matches('a')) {
        return;
    }

    const pathname = new URL(e.target.href).pathname;
    console.log(pathname);
    redirect(pathname);
}

function guestItems() {
    return `
        <li class="nav-item guest">
            <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item guest">
            <a class="nav-link" href="/register">Register</a>
        </li>
    `;
}

function loggedUserItems() {
    return `
        <li class="nav-item user">
            <a class="nav-link" id="welcome-msg">Welcome, ${email()}</a>
        </li>
        <li class="nav-item user">
            <a class="nav-link" href="/logout">Logout</a>
        </li>
    `;
}
