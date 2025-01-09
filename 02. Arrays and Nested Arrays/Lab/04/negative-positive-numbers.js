function solve(elementes) {
    const updatedArr = [];
    for (const element of elementes) {
        if (element >= 0) {
            updatedArr.push(element);
        } else {
            updatedArr.unshift(element);
        }
    }
    console.log(updatedArr.join("\n"));
}

solve([7, -2, 8, 9]);
