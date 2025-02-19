function solve(numbers, startIndex, endIndex) {
    if (!Array.isArray(numbers)) {
        return NaN;
    }
    if (startIndex < 0) startIndex = 0;
    if (endIndex > numbers.length) endIndex = numbers.length - 1;

    return numbers
        .slice(startIndex, endIndex + 1)
        .reduce((acc, current) => acc + Number(current), 0);
}

console.log(solve([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1));
