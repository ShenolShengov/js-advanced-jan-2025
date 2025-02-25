document.addEventListener('DOMContentLoaded', setUp);

const html = {
    main: document.querySelector('main'),
    userEmailSpan: document.querySelector('.email span'),
    sections: {
        catches: document.querySelector('#catches'),
    },
    navButtons: {
        home: document.querySelector('#home'),
        logout: document.querySelector('#user #logout'),
        login: document.querySelector('#guest #login'),
        register: document.querySelector('#guest #register'),
    },
    buttons: {
        load: document.querySelector('.load'),
        add: document.querySelector('.add'),
    },
    pages: {
        register: document.querySelector('#register-view'),
        login: document.querySelector('#login-view'),
        home: document.querySelector('#home-view'),
    },
    forms: {
        register: document.querySelector('#register-view form'),
        login: document.querySelector('#login-view form'),
        addCatch: document.querySelector('#addForm'),
    },
};

const urls = {
    register: 'http://localhost:3030/users/register',
    login: 'http://localhost:3030/users/login',
    logout: 'http://localhost:3030/users/logout',
    allCatches: 'http://localhost:3030/data/catches',
    newCatch: 'http://localhost:3030/data/catches ',
    updateCatch: 'http://localhost:3030/data/catches',
    deleteCatch: 'http://localhost:3030/data/catches',
};

const authorizationHeaders = new Headers();

function setUp() {
    checkAutorization();
    attachNavBarLinkEvents();
    html.main.append(html.pages.home);
    html.forms.register.addEventListener('submit', registerUser);
    html.forms.login.addEventListener('submit', loginUser);
    html.navButtons.logout.addEventListener('click', logoutUser);
    html.buttons.load.addEventListener('click', loadCatches);
    html.forms.addCatch.addEventListener('submit', addCatch);
}

function checkAutorization() {
    if (localStorage.getItem('accessToken')) {
        toggleGuestButtons();
        togglelUserButtons();
        showUserEmail();
        toggleAddButton();
        loadCatches();
        authorizationHeaders.append('x-Authorization', localStorage.getItem('accessToken'));
    }
}

function addCatch(e) {
    e.preventDefault();
    const data = extractInputsValues(this);
    data._id = getUserId();
    this.reset();
    fetch(urls.newCatch, {
        method: 'post',
        headers: authorizationHeaders,
        body: JSON.stringify(data),
    });
}

function loadCatches() {
    html.sections.catches.innerHTML = '';
    fetch(urls.allCatches)
        .then((r) => r.json())
        .then((data) => {
            data.map(toCatchElement).forEach((el) => html.sections.catches.append(el));
        });
}

function toCatchElement(data) {
    console.log(data);
    const isUserOwner = getUserId() === null ? false : getUserId() === data._ownerId;
    console.log(getUserId(), data._ownerId);
    const catchEl = createElement('div', { className: 'catch' });
    createElement('label', { textContent: 'Angler' }, catchEl);
    createElement('input', { type: 'text', className: 'angler', value: data.angler, disabled: !isUserOwner }, catchEl);
    createElement('label', { textContent: 'Weight' }, catchEl);
    createElement('input', { type: 'text', className: 'weight', value: data.weight, disabled: !isUserOwner }, catchEl);
    createElement('label', { textContent: 'Species' }, catchEl);
    createElement(
        'input',
        { type: 'text', className: 'species', value: data.species, disabled: !isUserOwner },
        catchEl
    );
    createElement('label', { textContent: 'Location' }, catchEl);
    createElement(
        'input',
        { type: 'text', className: 'location', value: data.location, disabled: !isUserOwner },
        catchEl
    );
    createElement('label', { textContent: 'Bait' }, catchEl);
    createElement('input', { type: 'text', className: 'bait', value: data.bait, disabled: !isUserOwner }, catchEl);
    createElement('label', { textContent: 'Capture Time' }, catchEl);
    createElement(
        'input',
        {
            type: 'number',
            className: 'captureTime',
            value: data.captureTime,
            disabled: !isUserOwner,
        },
        catchEl
    );

    createElement(
        'button',
        {
            textContent: 'Update',
            className: 'update',
            onclick: updateCatch,
            dataset: {
                id: data._id,
            },
            disabled: !isUserOwner,
        },
        catchEl
    );
    createElement(
        'button',
        {
            textContent: 'Delete',
            className: 'delete',
            onclick: deleteCatch,
            dataset: {
                id: data._id,
            },
            disabled: !isUserOwner,
        },
        catchEl
    );
    return catchEl;
}

function deleteCatch(e) {
    const id = e.target.dataset.id;
    fetch(`http://localhost:3030/data/catches/${id}`, {
        method: 'delete',
        headers: authorizationHeaders,
    });
}

function updateCatch(e) {
    const id = e.target.dataset.id;
    const data = extractInputsValues(this.closest('.catch'), []);
    fetch(urls.updateCatch + '/' + id, {
        method: 'put',
        headers: authorizationHeaders,
        body: JSON.stringify(data),
    }).then(r => console.log(r));
}

function getUserId() {
    return localStorage.getItem('_id') || null;
}

function logoutUser() {
    toggleGuestButtons();
    togglelUserButtons();
    hideUserEmail();
    loadCatches();
    toggleAddButton();
    fetch(urls.logout, {
        headers: authorizationHeaders,
    });
    localStorage.clear();
}

function toggleAddButton() {
    html.buttons.add.disabled = !html.buttons.add.disabled;
}

function loginUser(e) {
    e.preventDefault();
    const data = extractInputsValues(this, []);
    fetch(urls.login, {
        method: 'post',
        body: JSON.stringify(data),
    })
        .then((r) => {
            if(!r.ok) {
                showFormErorMessage('Not valid credentials', this);
                return null;
            }
            return r.json();
        })
        .then((data) => {
            if(!data) return;
            resetForm(this);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('_id', data._id);
            localStorage.setItem('email', data.email);
            toggleGuestButtons();
            togglelUserButtons();
            showUserEmail();
            toggleAddButton();
            loadCatches(); //remove for performance
            changePage('home');
            authorizationHeaders.append('x-Authorization', localStorage.getItem('accessToken'));
        });
}

function togglelUserButtons() {
    html.navButtons.logout.classList.toggle('hidden');
}

function toggleGuestButtons() {
    html.navButtons.login.classList.toggle('hidden');
    html.navButtons.register.classList.toggle('hidden');
}

function showUserEmail() {
    html.userEmailSpan.textContent = localStorage.getItem('email');
}

function hideUserEmail() {
    html.userEmailSpan.textContent = 'guest';
}

function resetForm(form) {
    form.reset();
    form.querySelector('.notification').textContent = '';
}

function showFormErorMessage(message, form) {
    form.querySelector('.notification').textContent = message;
}

function registerUser(e) {
    e.preventDefault();
    const data = extractInputsValues(e.target);
    delete data.resPass;
    if (Object.values(data).some((d) => d === '')) {
        return;
    }
    fetch(urls.register, {
        method: 'post',
        body: JSON.stringify(data),
    })
        .then((r) => {
            if(!r.ok) {
                 showFormErorMessage('Not valid register data', this);
                 return
            }
            return r.json();
        })
        .then(() => {
            resetForm(this);
            changePage('home');
        })
}

function extractInputsValues(container) {
    if (container.matches('form')) {
        return [...new FormData(container)].reduce((data, [key, vaule]) => {
            data[key] = vaule;
            return data;
        }, {});
    }
    return [...container.querySelectorAll('input')].reduce((data, input) => {
        data[input.className] = input.value;
        return data;
    }, {});
}

function attachNavBarLinkEvents() {
    html.navButtons.home.addEventListener('click', () => changePage('home'));
    html.navButtons.login.addEventListener('click', () => changePage('login'));
    html.navButtons.register.addEventListener('click', () => changePage('register'));
}

function changePage(name) {
    Object.values(html.navButtons).forEach((b) => b.classList.remove('active'));
    html.navButtons[name].classList.add('active');
    html.main.innerHTML = '';
    html.main.append(html.pages[name]);
}

function createElement(tag, properties, parent) {
    const el = document.createElement(tag);
    Object.keys(properties).forEach((k) => {
        if (typeof properties[k] === 'object') {
            Object.assign(el[k], properties[k]);
        } else {
            el[k] = properties[k];
        }
    });
    if (parent) parent.append(el);
    return el;
}
