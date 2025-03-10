import page from '../../node_modules/page/page.mjs';
import navigation from "./navigaiton.js";
import { autorizationHeaders } from "./headers.js";

const baseUrl = 'http://localhost:3030/users/logout';

export default async function logout() {
    await fetch(baseUrl, {
        headers: autorizationHeaders()
    })
    localStorage.clear('user');
    page('/');
    navigation();
}