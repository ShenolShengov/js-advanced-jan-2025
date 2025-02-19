function solve() {
    const checkButton = document.querySelector('table tfoot button');
    checkButton.addEventListener('click', checkSudomu);
    const resetButton = document.querySelector('table tfoot button:last-child');
    resetButton.addEventListener('click', clearSudomuStatus);

    function checkSudomu() {
        const sudomu = [...document.querySelectorAll('td input')].map(
            (e) => +e.value
        );
        const isValidSudomu = validateSudomu(sudomu);
        const sudomuStatus = getSudomuStatus(isValidSudomu);

        const solutionTable = document.querySelector('table');
        const checkEl = document.querySelector('#check p');

        checkEl.textContent = sudomuStatus.validationMessage;
        checkEl.style.color = sudomuStatus.textColor;
        solutionTable.style.border = sudomuStatus.borderStyle;
    }

    function clearSudomuStatus() {
        const solutionTable = document.querySelector('table');
        const checkEl = document.querySelector('#check p');
        solutionTable.style.border = '';
        checkEl.textContent = '';

        [...document.querySelectorAll('table input')].forEach(
            (i) => (i.value = '')
        );
    }

    function getSudomuStatus(isValid) {
        return {
            validationMessage: getValidationMessage(isValid),
            borderStyle: getBorderStyle(isValid),
            textColor: isValid ? 'green' : 'red',
        };
    }

    function getValidationMessage(isValid) {
        return isValid
            ? 'You solve it! Congratulations!'
            : 'NOP! You are not done yet...';
    }

    function getBorderStyle(isValid) {
        return `2px solid ${isValid ? 'green' : 'red'}`;
    }

    function validateSudomu(sudomu) {
        const rows = extractRows(sudomu, 3);
        const columns = extractColumns(rows, 3);

        const isValid =
            numbersInRange(sudomu, 1, 3) &&
            hasUniqueRows(rows) &&
            hasUniqueRows(columns);
        return isValid;
    }

    function numbersInRange(numbers, lower, greater) {
        return numbers.every((e) => e >= lower && e <= greater);
    }

    function hasUniqueRows(matrix) {
        return matrix.every(distinctElements);
    }

    function distinctElements(elements) {
        return elements.every((el, index, arr) => arr.indexOf(el) == index);
    }

    function extractColumns(rows) {
        const cols = [];
        for (let colindex = 0; colindex < 3; colindex++) {
            const currentCol = [];
            for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
                currentCol.push(rows[rowIndex][colindex]);
            }
            cols.push(currentCol);
        }
        return cols;
    }

    function extractRows(numbers) {
        return Array.from({ length: 3 }, (_, i) => i * 3).reduce(
            (rows, index) => {
                rows.push(numbers.slice(index, index + 3));
                return rows;
            },
            []
        );
    }
}
