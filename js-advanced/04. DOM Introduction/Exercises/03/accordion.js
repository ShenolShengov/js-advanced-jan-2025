function toggle() {
    const buttonElement = document.querySelector('.button');
    const currentState = buttonElement.textContent;

    updateExtraElement(currentState);


    const updatedState = updateState(currentState);
    buttonElement.textContent = updatedState;

    function updateState(currentState) {
        if (currentState === 'More') return 'Less';
        return 'More';
    }

    function updateExtraElement(state) {
        const extraElement = document.querySelector('#extra');
        let updateDisplayValue = null;
        if (state === 'More') updateDisplayValue = 'block';
        else updateDisplayValue = 'none';
        console.log(updateDisplayValue, extraElement);
        extraElement.style.display = updateDisplayValue;
    }
}
