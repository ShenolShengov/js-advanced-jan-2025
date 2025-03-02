export function isLoggedIn() {
    return email() !== null;
}

export function email() {
    return localStorage.getItem('userEmail');
}
