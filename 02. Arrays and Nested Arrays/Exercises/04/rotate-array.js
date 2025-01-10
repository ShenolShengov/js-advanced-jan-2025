function solve(elements, countOfRotation) {
    for (let i = 0; i < countOfRotation; i++) {
        elements.unshift(elements.pop());
    }
    console.log(elements.join(" "));
}

solve(["1", "2", "3", "4"], 2);

solve(["Banana", "Orange", "Coconut", "Apple"], 15);
