function solve(number) {
    return (toAdd) => number + toAdd;
}

let add5 = solve(5);
console.log(add5(2));
console.log(add5(3));
