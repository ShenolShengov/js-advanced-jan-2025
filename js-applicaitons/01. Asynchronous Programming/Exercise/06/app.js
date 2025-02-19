const byId = (id) => document.querySelector('#' + id);

const html = {
    loadPostBtn: byId('btnLoadPosts'),
    posts: byId('posts'),
    viewPostBtn: byId('btnViewPost'),
    postTitle: byId('post-title'),
    postBody: byId('post-body'),
    postComments: byId('post-comments'),
};

const urls = {
    posts: 'http://localhost:3030/jsonstore/blog/posts',
    comments: 'http://localhost:3030/jsonstore/blog/comments',
};

function attachEvents() {
    html.loadPostBtn.addEventListener('click', loadPostHandler);
    html.viewPostBtn.addEventListener('click', viewPostHandler);
}

function viewPostHandler() {
    const {title, body, id} = html.posts.selectedOptions[0].dataset;
    html.postTitle.textContent = title;
    html.postBody.textContent = body;
    fetch(urls.comments)
        .then(r => r.json())
        .then(comments => {
            Object.values(comments)
                .filter(c => c.postId === id)
                .forEach(c => {
                    const li = document.createElement('li');
                    li.id = c.id;
                    li.textContent = c.text;
                    html.postComments.append(li);
                });
        });
}

function loadPostHandler() {
    fetch(urls.posts)
        .then((r) => r.json())
        .then((posts) => {
            Object.values(posts).forEach((p) => {
                const {body, id, title} = p;
                const option = document.createElement('option');
                option.textContent = title;
                option.value = id;
                Object.assign(option.dataset, p);
                html.posts.append(option);
            });
        });
}

attachEvents();
