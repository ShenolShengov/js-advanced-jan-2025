function solve(n, k) {
    const elements = [1];
    for (let i = 0; i < n - 1; i++) {
        const nextNum = elements
            .slice(Math.max(0, elements.length - k), elements.length)
            .reduce((sum, current) => sum + current, 0);
        elements.push(nextNum);
    }
    return elements;
}

solve(6, 3);
solve(8, 2);
