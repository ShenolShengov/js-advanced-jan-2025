function calc() {
    const firstNumber = Number(document.querySelector('#num1').value);
    const secondNumber = Number(document.querySelector('#num2').value);
    const sum = firstNumber + secondNumber;
    document.querySelector('#sum').value = sum;
}
