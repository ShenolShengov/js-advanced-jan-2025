class Contact {

    #online = false;
    #htmlElement = null;
    #showInfo = false;

    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.#generateHtmlElement();
    }

    #generateHtmlElement() {
        const article = document.createElement('article');

        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = `${this.firstName} ${this.lastName}`;

        const toggleInfoBtn = document.createElement('button');
        toggleInfoBtn.innerHTML = '&#8505;';
        title.appendChild(toggleInfoBtn);

        const info = document.createElement('div');
        info.style.display = 'none';
        info.className = 'info';

        const phone = document.createElement('span');
        phone.innerHTML = `&phone; ${this.phone}`;

        const email = document.createElement('span');
        email.innerHTML = `&#9993; ${this.email}`;

        info.append(phone, email);
        article.append(title, info);

        this.#htmlElement = article;

        toggleInfoBtn.addEventListener('click', () => {
            this.#htmlElement.querySelector('.info').style.display = this.#showInfo ? 'none' : 'block';
            this.#showInfo = !this.#showInfo;
        });
    }

    render(elementId) {
        document.querySelector(`#${elementId}`).appendChild(this.#htmlElement);
    }

    get online() {
        return this.#online;
    }

    set online(value) {
        this.#online = value;
        const ttitleEl = this.#htmlElement.querySelector('.title');
        if (this.#online) {
            ttitleEl.classList.add('online');
        } else {
            ttitleEl.classList.remove('online');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    let contacts = [
        new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
        new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
        new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
      ];
      contacts.forEach(c => c.render('main'));
      
      // After 1 second, change the online status to true
      setTimeout(() => contacts[1].online = true, 2000);
});