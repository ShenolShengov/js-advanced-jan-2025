function solve(arr) {
    const updatedArr = [];
    for (const el of arr) {
        if (el >= 0) {
            updatedArr.push(el);
        } else {
            updatedArr.unshift(el);
        }
    }
   console.log(updatedArr.join('\n'));
}

solve([7, -2, 8, 9]);