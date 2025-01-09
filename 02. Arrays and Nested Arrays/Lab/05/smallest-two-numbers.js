function solve(arr) {
    const twoSmallestNum = arr
        .sort((f, s) => (f < s ? -1 : f === s ? 0 : 1))
        .slice(0, 2);
    console.log(twoSmallestNum.join(" "));
}

solve([30, 15, 50, 5]);
solve([3, 0, 10, 4, 7, 3]);
