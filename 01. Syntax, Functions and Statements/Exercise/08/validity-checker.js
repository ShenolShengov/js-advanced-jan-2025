function solve(x1, y1, x2, y2) {

    console.log(`{${x1}, ${y1}} to {0, 0} is ${validnessStatus(x1, y1, 0, 0)}`);
    console.log(`{${x2}, ${y2}} to {0, 0} is ${validnessStatus(x2, y2, 0, 0)}`);
    console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${validnessStatus(x1, y1, x2, y2)}`);


    function validnessStatus(a, b, c, d){
        const distance = Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2));
        return Number.isInteger(distance) ? 'valid' : 'invalid';
    }
}

solve(3, 0, 0, 4);
solve(2, 1, 1, 1);