function solve(elements) {
    elements.sort((f, s) => (f < s ? -1 : f === s ? 0 : 1));

    const result = [];
    const elementsCount = elements.length;
    for (let i = 0; i < elementsCount; i++) {
        if (i % 2 == 0) {
            result.push(elements.shift());
        } else {
            result.push(elements.pop());
        }
    }

    return result;
}

solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]);
solve([22, 9, 63, 3, 2, 19, 54, 11, 21, 18]);
