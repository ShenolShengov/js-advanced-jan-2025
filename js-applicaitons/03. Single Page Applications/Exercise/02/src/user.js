export function isLoggedIn() {
    return email() !== null;
}

export function email() {
    return localStorage.getItem('userEmail');
}

export function accessToken() {
    return localStorage.getItem('accessToken');

}

export function userId() {
    return localStorage.getItem('userId');
}