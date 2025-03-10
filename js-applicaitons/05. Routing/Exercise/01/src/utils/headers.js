import { accessToken } from "../user.js";

export function autorizationHeaders() {
    const headers = new Headers();
    headers.append('X-Authorization', accessToken());
    return headers;
}