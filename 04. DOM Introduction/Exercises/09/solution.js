function solve() {
    function solve() {
        const number = +document.querySelector('#input').value;
        const selecedOption = document.querySelector('#selectMenuTo').value;
        const output = document.querySelector('#result');

        let result =
            selecedOption == 'binary'
                ? toBinary(number)
                : selecedOption == 'hexadecimal'
                ? toHex(number)
                : 'Error!';

        output.value = result;

        function toBinary(number) {
            let binary = '';
            while (number) {
                binary += number % 2;
                number = Math.trunc(number / 2);
            }
            return binary.split('').reverse().join('');
        }

        function toHex(number) {
            let hex = '';
            while (number) {
                hex += extractNextHexNumber(number);
                number = Math.trunc(number / 16);
            }
            return hex.split('').reverse().join('');
        }

        function extractNextHexNumber(number) {
            let num = number % 16;
            if (num <= 9) {
                return num;
            }
            const letter = String.fromCharCode('a'.codePointAt(0) + num - 10);
            return letter.toUpperCase();
        }
    }
}
