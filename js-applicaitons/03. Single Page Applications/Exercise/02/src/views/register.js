import redirect from '../router.js';
import renderNavigaiton from '../utils/navigation.js';

const container = document.getElementById('container');
const baseUrl = 'http://localhost:3030/users/register';

export default function registerPage() {
    const registerSection = document.createElement('section');
    registerSection.id = 'form-sign-up';
    registerSection.classList = 'view-section';
    registerSection.innerHTML = `
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
    const registerForm = registerSection.querySelector('#register-form');
    registerForm.addEventListener('submit', registerUser);
    container.appendChild(registerSection);
}

function registerUser(e) {
    e.preventDefault();
    const {email, password} = Object.fromEntries(new FormData(this));
    if (email === '' || password === '') {
        alert('Invalid register data');
        return;
    }
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
        .then(() => {
            renderNavigaiton();
            redirect('/');
        })
        .catch((err) => alert(err.message));
}