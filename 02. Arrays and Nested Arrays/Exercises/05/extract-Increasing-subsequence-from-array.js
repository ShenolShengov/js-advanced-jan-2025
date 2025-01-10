function solve(elements) {
    return elements.filter(
        (el, index, all) => index === 0 || el >= all[index - 1]
    );
}

solve([1, 3, 8, 4, 10, 12, 3, 2, 24]);

solve([1, 2, 3, 4]);

solve([20, 3, 2, 15, 6, 1]);
