function solve(elements) {
    const biggestHalf = elements
        .sort((f, s) => (f < s ? -1 : f === s ? 0 : 1))
        .slice(elements.length / 2, elements.length);
    return biggestHalf;
}

solve([4, 7, 2, 5]);
solve([[3, 19, 14, 7, 2, 19, 6]]);
