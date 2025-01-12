function subtract() {
    const firstNumber = +document.querySelector('#firstNumber').value;
    const secondNumber = +document.querySelector('#secondNumber').value;
    const resultElement = document.querySelector('#result');
    resultElement.textContent = firstNumber - secondNumber;
}