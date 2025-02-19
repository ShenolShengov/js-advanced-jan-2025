function solve(arr) {
    const sum = arr.reduce((sum, current) => sum + current, 0);
    const inverseSum = arr
        .map((n) => 1 / n)
        .reduce((sum, current) => sum + current, 0);
    const concatenedNumbers = arr.join('');
    console.log(sum);
    console.log(inverseSum);
    console.log(concatenedNumbers);
}

solve([1, 2, 3]);
solve([2, 4, 8, 16]);
