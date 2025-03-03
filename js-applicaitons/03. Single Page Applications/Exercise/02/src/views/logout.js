import redirect from '../router.js';
import { autorizationHeaders } from '../utils/autorization.js';
import { displayError, removeError } from '../utils/errors.js';
import renderNavigaiton from '../utils/navigation.js';

const baseUrl = 'http://localhost:3030/users/lougout';
const container = document.getElementById('container');

export default function logout() {
    
    fetch(baseUrl, {
        headers: autorizationHeaders()
    })
        .then(() => {
            removeError(container);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userEmail');
            renderNavigaiton();
            redirect('/');
        })
        .catch((err) => displayError(err.message, container));
}
