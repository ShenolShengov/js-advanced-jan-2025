
export function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

function getUser() {
    if(!isLoggedIn()) {
        return null;
    }
    return JSON.parse(localStorage.getItem('user'));
}

export function id() {
    return getUser()?._id;
}

export function accessToken() {
    return getUser()?.accessToken;
}