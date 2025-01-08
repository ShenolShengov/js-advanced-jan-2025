function solve(number) {
    const firstDigit = +String(number).charAt(0);
    let sum = 0;
    let isSameNumbers = true;
    while (number != 0) {
        const currentDigit = number % 10;
        sum += currentDigit;
        number = Math.floor(number / 10);
        if(firstDigit !== currentDigit) isSameNumbers = false;
    }
    console.log(isSameNumbers);
    console.log(sum);
}

solve(2222222);
solve(1234);