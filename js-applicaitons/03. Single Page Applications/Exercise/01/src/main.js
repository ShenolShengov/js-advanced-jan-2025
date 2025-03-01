const form = document.querySelector('form');
const cancelButton = document.querySelector('.cancel');
const baseUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const commentsUrl = 'http://localhost:3030/jsonstore/collections/myboard/comments';

cancelButton.addEventListener('click', () => form.reset());
form.addEventListener('submit', processTopic);

const section = document.querySelector('main');
const clearTopics = () => section.querySelectorAll('.topic-container').forEach((t) => t.remove());

topicPage();

function processTopic(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const topicData = Object.fromEntries(formData);

    if (Object.values(topicData).some((v) => v === '')) {
        return;
    }
    const { topicName: title, username, postText: content } = topicData;
    fetch(baseUrl, {
        method: 'post',
        body: JSON.stringify({
            title,
            username,
            content,
            date: new Date(),
        }),
    })
        .then(topicPage)
        .catch((err) => {
            alert(err);
        });
}

function topicPage() {
    clearTopics();
    fetch(baseUrl)
        .then((r) => r.json())
        .then((data) => {
            Object.values(data).forEach(renderTopic);
        });
}

function renderTopic(data) {
    const topicElement = document.createElement('div');
    topicElement.classList = 'topic-container';
    topicElement.innerHTML = `
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <a href="#" class="normal">
                    <h2>${data.title}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${data.date}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${data.username}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    topicElement.querySelector('a').addEventListener('click', (e) => topicDetailsPage(e, data._id));
    section.appendChild(topicElement);
}

// function topicDetailsPage(e, id) {
//     e.preventDefault();
//     clearTopics();
//     const topicDetailsElemnt = document.createElement('div');
//     topicDetailsElemnt.classList = 'comment';
//     fetch(baseUrl + `/${id}`)
//         .then((r) => r.json())
//         .then(({ title, username, content, date }) => {
//             topicDetailsElemnt.innerHTML = `
//                 <div class="header">
//                     <img src="./static/profile.png" alt="avatar" />
//                     <p><span>${username}</span> posted on <time>${date}/time></p>
//                     <p class="post-content">${content}</p>
//                 </div>
//             `;
//         });
//     section.appendChild(topicDetailsElemnt);
// }

function topicDetailsPage(e, id) {
    e.preventDefault();
    clearTopics();
    const topicDetailsElemnt = document.createElement('div');
    topicDetailsElemnt.classList = 'theme-content';
    fetch(baseUrl + `/${id}`)
        .then((r) => r.json())
        .then(({ title, username, content, date }) => {
            topicDetailsElemnt.innerHTML = `
                <div class="theme-title">
                    <div class="theme-name-wrapper">
                        <div class="theme-name">
                            <h2>${title}</h2>
                        </div>
                    </div>
                </div>
                <div class="comment">
                <div class="header">
                                     <img src="./static/profile.png" alt="avatar" />
                                    <p><span>${username}</span> posted on <time>${date}/time></p>
                                     <p class="post-content">${content}</p>
                            </div>
                    <p><span>${username}</span></p>
                </div>
                <div class="answer-comment">
                    <p><span>currentUser</span> comment:</p>
                    <div class="answer">
                        <form>
                            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                            <div>
                                <label for="username">Username <span class="red">*</span></label>
                                <input type="text" name="username" id="username" />
                            </div>
                            <button>Post</button>
                        </form>
                    </div>
                </div>
            `;
        });
    section.appendChild(topicDetailsElemnt);
}

function commentsSeciton(id) {
    fetch(commentsUrl + `/${id}`)
        .then((r = r.json()))
        .then((d) => {
            return html` <div class="comment"></div> `;
        });
}
