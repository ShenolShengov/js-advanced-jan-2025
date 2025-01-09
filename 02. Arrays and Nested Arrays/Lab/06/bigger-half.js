function solve(arr) {
    const biggestHalf = arr
        .sort((f, s) => (f < s ? -1 : f === s ? 0 : 1))
        .slice(arr.length / 2, arr.length);
    return biggestHalf;
}

solve([4, 7, 2, 5]);
solve([[3, 19, 14, 7, 2, 19, 6]]);
