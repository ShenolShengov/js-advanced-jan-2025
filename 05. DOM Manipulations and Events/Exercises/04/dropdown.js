function addItem() {
    const [textInput, valueInput] = [
        ...document.querySelectorAll('input[type="text"]'),
    ];
    const [text, value] = [textInput.value, valueInput.value];

    if (!text || !value) return;

    const optionEl = document.createElement('option');
    optionEl.textContent = text;
    optionEl.value = value;

    document.querySelector('#menu').appendChild(optionEl);

    textInput.value = '';
    valueInput.value = '';

    textInput.focus();
}
