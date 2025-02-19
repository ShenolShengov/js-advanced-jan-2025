function solve() {
    const addBtn = document.querySelector('#add');
    addBtn.addEventListener('click', addTaskHandler);

    function addTaskHandler(e) {
        e.preventDefault();

        const [nameInput, descInput, dueDateInput] = document.querySelectorAll(
            '#task, #description, #date'
        );

        const inputsValues = extractValues(nameInput, descInput, dueDateInput);

        if (inputsValues.some((v) => v === '')) {
            return;
        }

        const [name, desciption, dueDate] = inputsValues;

        createTask(name, desciption, dueDate);

        clearInputs(nameInput, descInput, dueDateInput);
    }

    function createTask(name, desciption, dueDate) {
        const openTaskEl = document.querySelector(
            'section:has(h1.orange) div:last-child'
        );
        const taskEl = createElement('article', {}, openTaskEl);
        createElement('h3', { textContent: name }, taskEl);
        createElement(
            'p',
            { textContent: `Description: ${desciption}` },
            taskEl
        );
        createElement('p', { textContent: `Due Date: ${dueDate}` }, taskEl);
        const actionEl = createElement('div', { className: 'flex' }, taskEl);
        const startBtn = createElement(
            'button',
            { className: 'green', textContent: 'Start' },
            actionEl
        );
        const deleteBtn = createElement(
            'button',
            { className: 'red', textContent: 'Delete' },
            actionEl
        );

        deleteBtn.addEventListener('click', deleteTaskHandler);
        startBtn.addEventListener('click', startTaskHandler);
    }

    function startTaskHandler(e) {
        e.preventDefault();
        const taskEl = getTaskElement.call(this);
        taskEl.querySelector('.green').remove();
        const finishBtn = createElement(
            'button',
            { className: 'orange', textContent: 'Finish' },
            taskEl.querySelector('.flex')
        );
        document.querySelector('#in-progress').appendChild(taskEl);

        finishBtn.addEventListener('click', finishTaskHandler);
    }

    function finishTaskHandler(e) {
        e.preventDefault();
        const taskEl = getTaskElement.call(this);
        taskEl.querySelector('.flex').remove();
        const finishSection = document.querySelector(
            'section:has(.green) div:last-child'
        );
        finishSection.appendChild(taskEl);
    }

    function getTaskElement() {
        return this.closest('article');
    }

    function deleteTaskHandler(e) {
        e.preventDefault();
        getTaskElement.call(this).remove();
    }

    function clearInputs(...inputs) {
        inputs.forEach((i) => (i.value = ''));
    }

    function extractValues(...inputs) {
        return inputs.map((e) => e.value);
    }

    function createElement(tag, properties, parent) {
        const el = Object.assign(document.createElement(tag), properties);
        if (parent) {
            parent.appendChild(el);
        }
        return el;
    }
}
