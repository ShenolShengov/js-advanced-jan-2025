function getFibonator() {
    const numbers = [1];
    let current = 1;
    return () => {
        const toReturn = current;
        const next = numbers.slice(-2).reduce((sum, c) => sum + c, 0);
        numbers.push(next);
        current = next;
        return toReturn;
    };
}

// function getFibonator() {
//     const numbers = [0];
//     let current = 0;
//     return () => {
//         const toReturn = current;
//         const next = numbers.slice(-2).reduce((sum, c) => sum + c, 0) || 1;
//         numbers.push(next);
//         current = next;
//         return toReturn;
//     };
// }




let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13