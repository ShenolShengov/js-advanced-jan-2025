import redirect from "../router.js";
import { autorizationHeaders } from "../utils/autorization.js";

const baseUrl = (id) => `http://localhost:3030/data/movies/${id}`;
const container = document.getElementById('container');

export default function deleteMovie(id) {
    fetch(baseUrl(id), {
        method: 'delete',
        headers: autorizationHeaders()
    }).then(r => {
        if(!r.ok) {
            throw new Error('Error occursed when deleting movie');
        }
        redirect('/');
    }).catch(err => alert(err.message));
}