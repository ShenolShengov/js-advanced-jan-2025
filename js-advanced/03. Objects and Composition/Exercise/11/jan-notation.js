function solve(insturtions) {
    const numbers = [];
    let isEnoughOperands = true;
    insturtions.forEach((i) => {
        if (Number.isInteger(i)) {
            numbers.push(i);
        } else {
            if (numbers.length < 2) {
                isEnoughOperands = false;
                return;
            }
            const [first, second] = [numbers.pop(), numbers.pop()];
            const result = eval(`${second} ${i} ${first}`);
            numbers.push(result);
        }
    });

    if (!isEnoughOperands) {
        console.log('Error: not enough operands!');
    } else if (numbers.length > 1) {
        console.log('Error: too many operands!');
    } else {
        console.log(numbers.pop());
    }
}

solve([31, 2, '+', 11, '/']);
solve([3, 4, '+']);
solve([5, 3, 4, '*', '-']);
solve([7, 33, 8, '-']);
solve([15, '/']);
