
export function displayError(message, container) {
    removeError(container);
    const error = document.createElement('div');
    error.classList = 'error notifications';
    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    error.appendChild(messageEl);
    container.appendChild(error);
}

export function removeError(container) {
    container.querySelector('.error')?.remove();
}