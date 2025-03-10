import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const main = document.querySelector('.main-section');
const baseUrl = 'http://localhost:3030/users/register';

export default async function registerPage() {
    render(registerTemplate(), main);
}

function registerTemplate() {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Register New User</h1>
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
                        <div class="form-group">
                            <label class="form-control-label" for="rePass">Repeat</label>
                            <input class="form-control" id="rePass" type="password" name="rePass" />
                        </div>
                        <input type="submit" class="btn btn-primary" value="Register" />
                    </div>
                </div>
            </form>
        </div>
    `;
}

async function onSubmit(e) {
    e.preventDefault();
    const registerData = Object.fromEntries(new FormData(e.target));
    if (!isValidRegisterData(registerData)) {
        alert('Invalid register data');
        return;
    }
    const { email, password } = registerData;
    await register(email, password);
}

async function register(email, password) {
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
        
        page('/');
    } catch (err) {
        alert(err.message);
    }
}

function isValidRegisterData(registreData) {
    const { password, rePass } = registreData;
    const isPasswordMatch = password === rePass;
    return Object.values(registreData).every((v) => v !== '') && isPasswordMatch;
}
