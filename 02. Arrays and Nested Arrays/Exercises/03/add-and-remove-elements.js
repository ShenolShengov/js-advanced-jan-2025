function solve(commands) {
    let currentNumber = 1;

    const numbers = [];
    for (const command of commands) {
        if (command === "add") {
            numbers.push(currentNumber);
        } else {
            numbers.pop();
        }
        currentNumber++;
    }

    console.log(numbers.length !== 0 ? numbers.join("\n") : "Empty");
}

solve(["add", "add", "add", "add"]);

solve(["add", "add", "remove", "add", "add"]);

solve(["remove", "remove", "remove"]);
