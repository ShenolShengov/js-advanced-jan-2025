function solve(matrix) {
    const mainDiagonalSum = calculateDiagonal(matrix, 0, 0, 1, 1);
    const secondaryDiagonalSum = calculateDiagonal(
        matrix, 0, matrix[0].length - 1, 1, -1
    );

    console.log(mainDiagonalSum, secondaryDiagonalSum);

    function calculateDiagonal(matrix, row, col, rowStep, colStep) {
        let sum = 0;
        while ( row >= 0 && row < matrix.length &&
                col >= 0 && col < matrix[0].length
        ) {
            sum += matrix[row][col];
            row += rowStep;
            col += colStep;
        }
        return sum;
    }
}

solve(
    [[20, 40],
    [10, 60]]
);

solve(
    [[3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]]
);

