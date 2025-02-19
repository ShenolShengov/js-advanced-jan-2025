function solve(matrix) {
    const rowsAndColsSums = getRowsSums(matrix).concat(getColSums(matrix));
    return rowsAndColsSums.every((rowSum) => rowSum === rowsAndColsSums[0]);

    function getRowsSums(matrix) {
        return matrix.map((row) =>
            row.reduce((initialValue, el) => el + initialValue, 0)
        );
    }

    function getColSums(matrix) {
        const colSums = [];
        for (let i = 0; i < matrix[0].length; i++) {
            let currentColSum = 0;
            for (let j = 0; j < matrix.length; j++) {
                currentColSum += matrix[j][i];
            }
            colSums.push(currentColSum);
        }
        return colSums;
    }
}

solve([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5],
]);

solve([
    [11, 32, 45],
    [21, 0, 1],
    [21, 1, 1],
]);

solve([
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
]);
