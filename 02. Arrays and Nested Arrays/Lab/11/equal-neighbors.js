function solve(matrix) {
    let neighborsCount = 0;

    for (let row = 0; row < matrix.length; row++) {
        for(let col = 0; col < matrix[0].length; col++) {
            const hasNextRowNeighbor = matrix[row][col] === matrix[row][col + 1];
            const hasNextColNeighbor = matrix[row + 1] && matrix[row][col] === matrix[row + 1][col];
            
            if(hasNextRowNeighbor) neighborsCount++;
            if(hasNextColNeighbor) neighborsCount++;
        }
    }
    return neighborsCount;
}

console.log(solve([['2', '3', '4', '7', '0'],
['4', '0', '5', '3', '4'],
['2', '3', '5', '4', '2'],
['9', '8', '7', '5', '4']]));