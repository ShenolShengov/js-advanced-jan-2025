import redirect from '../router.js';
import { autorizationHeaders } from '../utils/autorization.js';
import renderNavigaiton from '../utils/navigation.js';

const baseUrl = 'http://localhost:3030/users/lougout';
const container = document.getElementById('container');

export default function logout() {
    
    fetch(baseUrl, {
        headers: autorizationHeaders()
    })
        .then(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
            renderNavigaiton();
            redirect('/');
        })
        .catch((err) => alert(err.message, container));
}
