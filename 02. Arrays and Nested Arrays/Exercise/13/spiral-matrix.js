function solve(row, col) {
    let matrix = createEmptyMatrix(row, col);

    let rowIndex = 0;
    let colIndex = 0;

    let rowStep = 0;
    let colStep = 1;
    
    let currentDirection = 'right';

    for (let i = 0; i < row * col; i++) {

        matrix[rowIndex][colIndex] = i + 1;

        const hasValidNextStep =
            matrix[rowIndex + rowStep] &&
            matrix[rowIndex + rowStep][colIndex + colStep] === 0;

        if (!hasValidNextStep) {
            currentDirection = changeDirection(currentDirection);
        }

        updatePosition();
    }

    printMatrix(matrix);

    function printMatrix(matrix) {
        for (const row of matrix) {
            console.log(row.join(' '));
        }
    }

    function updatePosition() {
        rowIndex += rowStep;
        colIndex += colStep;
    }

    function changeDirection(currentDirection) {
        switch (currentDirection) {
            case 'up': {
                colStep = 1;
                rowStep = 0;
                return 'right';
            }
            case 'down': {
                colStep = -1;
                rowStep = 0;
                return 'left';
            }
            case 'left': {
                colStep = 0;
                rowStep = -1;
                return 'up';
            }
            case 'right': {
                colStep = 0;
                rowStep = 1;
                return 'down';
            }
        }
    }

    function createEmptyMatrix(rowCount, colCount) {
        const matrix = [];
        for (let i = 0; i < rowCount; i++) {
            matrix.push(Array(colCount).fill(0));
        }
        return matrix;
    }
}

solve(5, 5);
solve(3, 3);
