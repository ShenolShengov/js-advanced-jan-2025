function solve(input) {
    const [rows, cols, x, y] = input;

    const matrix = createEmptyMatrix(rows, cols);

    matrix[x][y] = 1;

    let leftNumbers = rows * cols - 1;
    let numberToFill = 2;

    let touchedNumbers = [[x, y]];

    while (leftNumbers !== 0) {
        const newTouchedNumbers = [];

        for (const position of touchedNumbers) {
            const xToStart = position[0] - 1;
            const yToStart = position[1] - 1;

            for (let row = xToStart; row < xToStart + 3; row++) {
                if (row < 0) continue;
                for (let col = yToStart; col < yToStart + 3; col++) {
                    if (col < 0) continue;
                    if (matrix[row] && matrix[row][col] === 0) {
                        matrix[row][col] = numberToFill;
                        newTouchedNumbers.push([row, col]);
                        leftNumbers--;
                    }
                }
            }
        }

        numberToFill++;
        touchedNumbers = newTouchedNumbers;
    }

    for (const row of matrix) {
        console.log(row.join(' '));
    }

    function createEmptyMatrix(rows, cols) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            const emptyRow = new Array(cols);
            emptyRow.fill(0);
            matrix.push(emptyRow);
        }
        return matrix;
    }
}

solve(5, 5, 0, 0);
