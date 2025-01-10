function solve(matrix) {
    return isMagical(matrix);

    function isMagical(matrix) {
        const isRowsMagical = matrix
            .map((r) => r.reduce((sum, c) => sum + c, 0))
            .every((rowSum, _, allRowsSums) => rowSum === allRowsSums[0]);

        const isColsMagical = matrix
            .map((_, index) => {
                let sum = 0;
                for (let col = 0; col < matrix.length; col++) {
                    sum += matrix[index][col];
                }
                return sum;
            })
            .every((colSum, _, allColsSums) => colSum === allColsSums[0]);

        return isRowsMagical && isColsMagical;
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
