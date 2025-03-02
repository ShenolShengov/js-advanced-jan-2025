import redirect from '../router.js';
import { displayError, removeError } from '../utils/errors.js';
import renderNavigaiton from '../utils/navigation.js';

const baseUrl = 'http://localhost:3030/users/lougout';
const container = document.getElementById('container');

export default function logout() {
    const accessToken = localStorage.getItem('accessToken');
    fetch(baseUrl, {
        headers: {
            'X-Authorization': accessToken,
        },
    })
        .then(() => {
            console.log('logout success');
            removeError(container);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userEmail');
            renderNavigaiton();
            redirect('/');
        })
        .catch((err) => displayError(err.message, container));
}
