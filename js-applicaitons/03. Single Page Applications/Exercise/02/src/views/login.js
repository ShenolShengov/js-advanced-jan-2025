import redirect from '../router.js';
import { displayError, removeError } from '../utils/errors.js';
import renderNavigaiton from '../utils/navigation.js';
import validate from '../utils/validator.js';

const container = document.getElementById('container');
const baseUrl = 'http://localhost:3030/users/login';

export default function loginPage() {
    const login = document.createElement('section');
    login.id = 'form-login';
    login.classList = 'view-section';
    login.innerHTML = `
        <form id="login-form" class="text-center border border-light p-5" action="" method="post">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    id="password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    name="password"
                    value=""
                />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    `;
    const loginForm = login.querySelector('#login-form');
    loginForm.addEventListener('submit', loginUser);
    container.appendChild(login);
}

function loginUser(e) {
    e.preventDefault();
    const loginData = Object.fromEntries(new FormData(this));
    removeError(this);
    if (!validate(loginData)) {
        displayError('Invalid credentials', this);
        return;
    }
    const { email, password } = loginData;
    fetch(baseUrl, {
        method: 'post',
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then((r) => {
            if (!r.ok) {
                throw new Error('Unexpected error!');
            }
            return r.json();
        })
        .then(({ email, accessToken }) => {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userEmail', email);
            renderNavigaiton()
            redirect('/');
        })
        .catch((err) => displayError(err.message, this));
}
