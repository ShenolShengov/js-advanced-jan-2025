function solve(matrixInput) {
    const matrix = parseMatrix(matrixInput);

    const diagonalsPositions = [];

    const firstMainDiagonalSum = calculateDiagonal(
        matrix,
        0,
        0,
        1,
        1,
        diagonalsPositions
    );
    const secondMainDiagonalSum = calculateDiagonal(
        matrix,
        0,
        matrix[0].length - 1,
        1,
        -1,
        diagonalsPositions
    );

    const isDiogonalsAreEquals = firstMainDiagonalSum === secondMainDiagonalSum;

    if (isDiogonalsAreEquals) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (row !== col && row !== matrix.length - 1 - col) {
                    matrix[row][col] = firstMainDiagonalSum;
                }
            }
        }
    }

    for (const row of matrix) {
        console.log(row.join(' '));
    }

    function parseMatrix(matrixInput) {
        const matrix = [];
        for (row of matrixInput) {
            matrix.push(row.split(' ').map((e) => +e));
        }
        return matrix;
    }

    function calculateDiagonal(
        matrix,
        rowStart,
        colStart,
        rowStep,
        colStep,
        diagonalsPositions
    ) {
        let sum = 0;

        while (
            rowStart >= 0 &&
            rowStart < matrix.length &&
            colStart >= 0 &&
            colStart < matrix[0].length
        ) {
            sum += matrix[rowStart][colStart];
            diagonalsPositions.push([rowStart, colStart]);
            rowStart += rowStep;
            colStart += colStep;
        }
        return sum;
    }
}

solve([
    '5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1',
]);
