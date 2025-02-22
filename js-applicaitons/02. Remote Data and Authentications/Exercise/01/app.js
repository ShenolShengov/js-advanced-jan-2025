const url = 'http://localhost:3030/jsonstore/messenger';

const html = {
    messagesArea: document.querySelector('#messages'),
    authorInput: document.querySelector('input[name="author"]'),
    contentInput: document.querySelector('input[name="content"]'),
    sendBtn: document.querySelector('#submit'),
    refreshBtn: document.querySelector('#refresh'),
};

function attachEvents() {
    html.refreshBtn.addEventListener('click', refreshHandler);
    html.sendBtn.addEventListener('click', sendMessageHandler);
}

function sendMessageHandler() {
    const data = {
        author: html.authorInput.value,
        content: html.contentInput.value
    };

    fetch(url, {
        method: 'post',
        body: JSON.stringify(data)
    }).then(r => console.log(r.status));
}

function refreshHandler() {
    fetch(url)
        .then((r) => r.json())
        .then((messages) => {
            const formatedMessages = Object.values(messages).map(({author, content}) => {
                return `${author}: ${content}`;
            }).join('\n');
            html.messagesArea.value = formatedMessages;
        });
}

attachEvents();
