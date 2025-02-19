const main = document.querySelector('main');
const usersInformationUrl = 'http://localhost:3030/jsonstore/advanced/profiles';

function lockedProfile() {
    fetch(usersInformationUrl)
        .then((r) => r.json())
        .then((d) => {
            Object.values(d).forEach(createProfileElement);
        });
}

function createProfileImgElement() {
    return createElement('img', {
        className: 'userIcon',
        src: './iconProfile2.png',
    });
}

function createProfileElement(userData) {
    const profile = createElement('div', { className: 'profile' }, main);
    const profileImg = createProfileImgElement();
    profile.append(profileImg);
    createElement('label', { textContent: 'Lock' }, profile);
    const lock = createElement(
        'input',
        { type: 'radio', name: 'user1Locked', value: 'lock', checked: true },
        profile
    );
    createElement('label', { textContent: 'Unlock' }, profile);
    createElement(
        'input',
        { type: 'radio', name: 'user1Locked', value: 'unlock' },
        profile
    );
    createElement('br', {}, profile);
    createElement('hr', {}, profile);
    createElement('label', { textContent: 'Username' }, profile);
    createElement(
        'input',
        {
            type: 'text',
            name: 'user1Username',
            value: userData.username,
            disabled: true,
            readonly: true,
        },
        profile
    );
    const informationDiv = createElement(
        'div',
        { className: 'user1Username' },
        profile
    );
    informationDiv.style.display = 'none';
    createElement('hr', {}, informationDiv);
    createElement('label', { textContent: 'Email' }, informationDiv);
    createElement(
        'input',
        {
            type: 'email',
            name: 'user1Email',
            value: userData.email,
            disabled: true,
            readonly: true,
        },
        informationDiv
    );
    createElement('label', { textContent: 'Age' }, informationDiv);
    createElement(
        'input',
        {
            type: 'number',
            name: 'user1Age',
            value: userData.age,
            disabled: true,
            readonly: true,
        },
        informationDiv
    );
    const toggleButton = createElement(
        'button',
        { textContent: 'Show more' },
        profile
    );
    toggleButton.addEventListener('click', toggleUserInformationHandler);
}

function toggleUserInformationHandler(e) {
    const profile = this.closest('.profile');
    const isLocked = profile.querySelector('input[value="lock"]:checked');
    if (isLocked) return;
    const state =
        this.textContent == 'Show more'
            ? { profileDisplay: 'block', next: 'Hide it' }
            : { profileDisplay: 'none', next: 'Show more' };
    profile.querySelector('.user1Username').style.display =
        state.profileDisplay;
    e.target.textContent = state.next;
}

function createElement(tag, properties, parent) {
    const el = Object.assign(document.createElement(tag), properties);
    if (parent) parent.append(el);
    return el;
}
