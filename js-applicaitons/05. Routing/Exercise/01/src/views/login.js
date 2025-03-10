import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import navigation from '../utils/navigaiton.js';

const main = document.querySelector('.main-section');
const baseUrl = 'http://localhost:3030/users/login';

export default async function loginPage() {
    render(loginTemplate(), main);
}

function loginTemplate() {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Login User</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form @submit="${onSubmit}">
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="email">Email</label>
                            <input class="form-control" id="email" type="text" name="email" />
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="password">Password</label>
                            <input class="form-control" id="password" type="password" name="password" />
                        </div>
                        <input type="submit" class="btn btn-primary" value="Login" />
                    </div>
                </div>
            </form>
        </div>
    `;
}

async function onSubmit(e) {
    e.preventDefault();
    const loginData = Object.fromEntries(new FormData(e.target));
    if (!isValidRegisterData(loginData)) {
        alert('Invalid login data');
        return;
    }
    const { email, password } = loginData;
    await login(email, password);
}

async function login(email, password) {
    try {
        const res = await fetch(baseUrl, {
            method: 'post',
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!res.ok) {
            throw new Error('Error in register process');
        }
        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
        page('/'); 
        navigation();
    } catch (err) {
        alert(err.message);
    }
}

function isValidRegisterData(loginData) {
    return Object.values(loginData).every((v) => v !== '');
}
