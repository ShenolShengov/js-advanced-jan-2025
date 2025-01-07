function solve(n, m) {
    let sum = 0;
    for (let currentNum = +n; currentNum <= +m; currentNum++) {
        sum += currentNum;
    }
    console.log(sum);
}

solve("1", "5");
solve("-8", "20");
