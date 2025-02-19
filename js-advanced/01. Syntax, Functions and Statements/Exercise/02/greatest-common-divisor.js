function solve(firstNum, secondNum) {
    let divisor = 10;
    while (firstNum % divisor != 0 || secondNum % divisor != 0) {
        divisor--;
    }
    console.log(divisor);
}

solve(15, 5);
solve(2154, 458);
