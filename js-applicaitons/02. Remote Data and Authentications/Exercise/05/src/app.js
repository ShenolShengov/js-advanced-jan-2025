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

function setUp() {
    localStorage.clear();
    attachNavBarLinkEvents();
    html.main.append(html.pages.home);
    html.forms.register.addEventListener('submit', registerUser);
    html.forms.login.addEventListener('submit', loginUser);
    html.navButtons.logout.addEventListener('click', logoutUser);
    html.buttons.load.addEventListener('click', loadCatches);
    html.forms.addCatch.addEventListener('submit', addCatch);
}

function addCatch(e) {
    e.preventDefault();
    const data = extractInputsValues(this);
    data._id = getUserId();
    this.reset();
    fetch(urls.newCatch, {
        method: 'post',
        headers: headresWithAuthorizationToken(),
        body: JSON.stringify(data),
    });
}

function headresWithAuthorizationToken() {
    const headers = new Headers();
    const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
    headers.append('X-Authorization', accessToken);
    return headers;
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
    const isUserOwner = getUserId() === data._ownerId;
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

function deleteCatch() {
    const id = this.dataset.id;
    fetch(urls.deleteCatch + `/${id}`, {
        method: 'delete',
        headers: headresWithAuthorizationToken()
    })
        .then(loadCatches);
}

function updateCatch() {
    const id = this.dataset.id;
    const data = extractInputsValues(this.closest('.catch'), []);
    fetch(urls.updateCatch + `/${id}`, {
        method: 'put',
        headers: headresWithAuthorizationToken(),
        body: JSON.stringify(data)
    }).then(loadCatches);//possible remove for performance
}

function isLoggedUser() {
    return localStorage.getItem('user') !== null;
}

function getUserId() {
    if (!isLoggedUser()) return null;
    return JSON.parse(localStorage.getItem('user'))._id;
}

function logoutUser() {
    toggleGuestButtons();
    togglelUserButtons();
    hideUserEmail();
    loadCatches(); //remove for performance
    changePage('home');
    localStorage.removeItem('user');
    toggleAddButton();
    fetch(urls.logout, {
        method: 'post',
        headers: headresWithAuthorizationToken()
    })
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
        .then((r) => r.json())
        .then((data) => {
            if (data.hasOwnProperty('code')) {
                throw new Error(data.message);
            }
            resetForm(this);
            localStorage.setItem('user', JSON.stringify(data));
            toggleGuestButtons();
            togglelUserButtons();
            showUserEmail();
            toggleAddButton();
            loadCatches(); //remove for performance
            changePage('home');
        })
        .catch((err) => {
            console.error(err);
            showFormErorMessage(err, this);
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
    const user = JSON.parse(localStorage.getItem('user'));
    html.userEmailSpan.textContent = user.email;
}

function hideUserEmail() {
    html.userEmailSpan.textContent = 'guest';
}

function resetForm(form) {
    form.reset();
    form.querySelector('.notification').textContent = '';
}

function showFormErorMessage(error, form) {
    form.querySelector('.notification').textContent = error.message;
}

function registerUser(e) {
    e.preventDefault();
    const data = extractInputsValues(this, ['resPass']);
    fetch(urls.register, {
        method: 'post',
        body: JSON.stringify(data),
    })
        .then((r) => r.json())
        .then((data) => {
            if (data.hasOwnProperty('code')) {
                throw new Error(data.message);
            }
            resetForm(this);
            changePage('home');
        })
        .catch((err) => {
            showFormErorMessage(err, this);
        });
}

function extractInputsValues(container, skipProperties) {
    if (container.matches('form')) {
        return [...new FormData(container)].reduce((data, [key, vaule]) => {
            if (skipProperties && skipProperties.includes(key)) {
                return data;
            }
            data[key] = vaule;
            return data;
        }, {});
    }
    return [...container.querySelectorAll('input')]
            .reduce((data, input) => {
                if(skipProperties.includes(input.name)) {
                    return data;
                }
                data[input.className] = input.value;
                return data;
            },{});  

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
