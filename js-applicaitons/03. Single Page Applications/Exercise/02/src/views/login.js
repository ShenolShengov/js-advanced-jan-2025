import redirect from '../router.js';
import renderNavigaiton from '../utils/navigation.js';
import validate from '../utils/validator.js';

const container = document.getElementById('container');
const baseUrl = 'http://localhost:3030/users/login';

export default function loginPage() {
    const loginSection = document.createElement('section');
    loginSection.id = 'form-login';
    loginSection.classList = 'view-section';
    loginSection.innerHTML = `
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
    const loginForm = loginSection.querySelector('#login-form');
    loginForm.addEventListener('submit', loginUser);
    container.appendChild(loginSection);
}

function loginUser(e) {
    e.preventDefault();
    const loginData = Object.fromEntries(new FormData(this));
    if (!validate(loginData)) {
        alert('Invalid credentials');
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
        .then(({ email, accessToken, _id}) => {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userId', _id);
            renderNavigaiton()
            redirect('/');
        })
        .catch((err) => alert(err.message));
}
