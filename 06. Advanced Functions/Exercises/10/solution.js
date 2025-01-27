function solve() {
    const addMovieForm = document.querySelector('#add-new');

    addMovieForm.addEventListener('submit', addMovieHandler);

    const clearBtn = document.querySelector('#archive button');

    clearBtn.addEventListener('click', clearArchiveHanler);

    function clearArchiveHanler() {
        document.querySelector('#archive ul').innerHTML = '';
    }

    function addMovieHandler(e) {
        e.preventDefault();
        const inputs = [...document.querySelectorAll('#container input')];
        const [name, hall, ticketPrice] = inputs.map((i) => i.value);

        if (!isInputsValid(name, hall, ticketPrice)) {
            return;
        }

        addMovie(name, hall, ticketPrice);

        clearInputs(...inputs);
    }

    function addMovie(name, hall, ticketPrice) {
        const moivesListEl = document.querySelector('#movies ul');
        ticketPrice = Number(ticketPrice);
        const movieEl = createElement(
            'li',
            { dataset: { name, hall, ticketPrice } },
            moivesListEl
        );
        createElement('span', { textContent: name }, movieEl);
        const formatedHall = `Hall: ${hall}`;
        createElement('strong', { textContent: formatedHall }, movieEl);
        const actionEl = createElement('div', {}, movieEl);
        createElement(
            'strong',
            { textContent: ticketPrice.toFixed(2) },
            actionEl
        );
        createElement('input', { placeholder: 'Tickets Sold' }, actionEl);
        const archiveBtn = createElement(
            'button',
            { textContent: 'Archive' },
            actionEl
        );

        archiveBtn.addEventListener('click', archiveMovieHandler);
    }

    function archiveMovieHandler() {
        const movieEl = this.closest('li');
        const { name, ticketPrice } = movieEl.dataset;
        const soldTickets = movieEl.querySelector('input').value;

        if (!isNumber(soldTickets)) return;

        movieEl.remove();

        addMovieToArchive(name, ticketPrice, soldTickets);
    }

    function addMovieToArchive(name, ticketPrice, soldTickets) {
        const archiveList = document.querySelector('#archive ul');
        const archiveMovieEl = createElement('li', {}, archiveList);
        createElement('span', { textContent: name }, archiveMovieEl);

        const totalAmount = Number(ticketPrice) * Number(soldTickets);
        createElement(
            'strong',
            { textContent: `Total amount: ${totalAmount.toFixed(2)}` },
            archiveMovieEl
        );
        const deleteBtn = createElement(
            'button',
            { textContent: 'Delete' },
            archiveMovieEl
        );

        deleteBtn.addEventListener('click', deleteBtnHandler);
    }

    function deleteBtnHandler() {
        this.closest('li').remove();
    }

    function isInputsValid(name, hall, ticketPrice) {
        return (
            isValidString(name) && isValidString(hall) && isNumber(ticketPrice)
        );
    }

    function isValidString(string) {
        return string.trim() !== '';
    }

    function isNumber(input) {
        return input.trim() !== '' && Number.isFinite(+input);
    }

    function clearInputs(...inputs) {
        inputs.forEach((i) => (i.value = ''));
    }

    function createElement(tag, properties, parent) {
        const el = document.createElement(tag);
        Object.keys(properties).forEach((p) => {
            const value = properties[p];
            if (typeof value === 'object') {
                Object.assign(el[p], value);
            } else {
                el[p] = value;
            }
        });
        if (parent) parent.appendChild(el);
        return el;
    }
}
