function solve(elements) {


    const result = [];
    let biggest = Number.MIN_SAFE_INTEGER;

    elements.forEach(num => {
        
        if(num >= biggest) {
            result.push(num);
            biggest = num;
        }

    });

    return result;
}

solve([1, 3, 8, 4, 10, 12, 3, 2, 24]);

solve([1, 2, 3, 4]);

solve([20, 3, 2, 15, 6, 1]);
