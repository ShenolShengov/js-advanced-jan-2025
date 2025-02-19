function solve(first, second, third) {
    let length = 0;
    for (const p of arguments) {
        length += p.length;
    }
    console.log(length);
    const avgLength = Math.floor(length / arguments.length);
    console.log(avgLength);
}

solve('chocolate', 'ice cream', 'cake');
solve('pasta', '5', '22.3');
