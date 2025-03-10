import { autorizationHeaders } from './headers.js';
import page from '../../node_modules/page/page.mjs';

const baseUrl = (id) => `http://localhost:3030/data/catalog/${id}`;

export async function deleteFurniture(ctx) {
    const id = ctx.params.id;
    await fetch(baseUrl(id), {
        method: 'delete',
        headers: autorizationHeaders(),
    });
    page('/');
}
