function solve(firstNum, secondNum, operation) {
    let result;
    // switch (operation) {
    //     case '+': result = firstNum + secondNum;
    //     break;
    //     case '-': result = firstNum - secondNum;
    //     break;
    //     case '*': result = firstNum * secondNum;
    //     break;
    //     case '/': result = firstNum / secondNum;
    //     break;
    //     case '%': result = firstNum % secondNum;
    //     break;
    //     case '**': result = firstNum ** secondNum;
    //     break;
    // }
    result = eval(`${firstNum} ${operation} ${secondNum}`);
    console.log(result);
}

solve(5, 6, "+");
solve(3, 5.5, "*");
