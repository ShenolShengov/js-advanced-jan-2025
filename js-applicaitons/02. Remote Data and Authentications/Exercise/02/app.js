const html = {
    buttons: {
        load: document.querySelector('#btnLoad'),
        create: document.querySelector('#btnCreate'),
    },
    list: {
        phonebook: document.querySelector('#phonebook'),
    },
    inputs: {
        person: document.querySelector('#person'),
        phone: document.querySelector('#phone'),
    },
};

const url = 'http://localhost:3030/jsonstore/phonebook';

function attachEvents() {
    html.buttons.load.addEventListener('click', loadContacts);
    html.buttons.create.addEventListener('click', addContact);
}

function addContact() {
    const data = {
        person: html.inputs.person.value,
        phone: html.inputs.phone.value,
    };
    fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
    });
    loadContacts();
}

function loadContacts() {
    html.list.phonebook.innerHTML = '';
    fetch(url)
        .then((r) => r.json())
        .then((data) => {
            html.list.phonebook.append(
                ...Object.entries(data).map(([id, contactInfo]) =>
                    toContactListItem(id, contactInfo)
                )
            );
        });
}

function toContactListItem(id, contactInfo) {
    const item = document.createElement('li');
    item.textContent = `${contactInfo.person}: ${contactInfo.phone}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteContact);
    deleteBtn.dataset.id = id;
    item.append(deleteBtn);
    return item;
}

function deleteContact() {
    const id = this.dataset.id;
    fetch(url + `/${id}`, {
        method: 'delete',
    });
}

attachEvents();
