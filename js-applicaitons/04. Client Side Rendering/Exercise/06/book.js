const urls = {
    create: 'http://localhost:3030/jsonstore/collections/books',
    modify: id => `http://localhost:3030/jsonstore/collections/books/${id}`
}

export async function create(bookData) {
    await fetch(urls.create, {
        method: 'post',
        body: JSON.stringify(bookData),
    });
}

export async function deleteBook(id) {
    await fetch(urls.modify(id), {
        method: 'delete'
    })
}

export async function edit(bookData, id) {
    await fetch(urls.modify(id), {
        method: 'put',
        body: JSON.stringify(bookData)
    })
}
