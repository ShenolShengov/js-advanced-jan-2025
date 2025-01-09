function solve(elements) {
    const twoSmallestNum = elements
        .sort((first, second) => (first < second ? -1 : first === second ? 0 : 1))
        .slice(0, 2);
    console.log(twoSmallestNum.join(" "));
}

solve([30, 15, 50, 5]);
solve([3, 0, 10, 4, 7, 3]);
