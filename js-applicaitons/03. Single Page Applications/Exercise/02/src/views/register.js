import redirect from '../router.js';
import { displayError, removeError } from '../utils/errors.js';
import renderNavigaiton from '../utils/navigation.js';
import validate from '../utils/validator.js';

const container = document.getElementById('container');
const baseUrl = 'http://localhost:3030/users/register';

export default function registerPage() {
    const register = document.createElement('section');
    register.id = 'form-sign-up';
    register.classList = 'view-section';
    register.innerHTML = `
        <form id="register-form" class="text-center border border-light p-5" action="" method="">
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

            <div class="form-group">
                <label for="repeatPassword">Repeat Password</label>
                <input
                    id="repeatPassword"
                    type="password"
                    class="form-control"
                    placeholder="Repeat-Password"
                    name="repeatPassword"
                    value=""
                />
            </div>

            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    `;
    const registerForm = register.querySelector('#register-form');
    registerForm.addEventListener('submit', registerUser);
    container.appendChild(register);
}

function registerUser(e) {
    e.preventDefault();
    const registerData = Object.fromEntries(new FormData(this));
    removeError(this);
    if (!validate(registerData)) {
        displayError('Invalid register data', this);
        return;
    }
    const {email, password} = registerData;
    fetch(baseUrl, {
        method: 'post',
        body: JSON.stringify({
            email,
            password
        })
    })
        .then((r) => {
            if(!r.ok) {
                throw new Error('Unexpected error!');
            }
            return r.json();
        })
        .then(({email, accessToken}) => {
            // localStorage.setItem('accessToken', accessToken);
            // localStorage.setItem('userEmail', email);
            renderNavigaiton();
            redirect('/');
        })
        .catch((err) => displayError(err.message, this));
}