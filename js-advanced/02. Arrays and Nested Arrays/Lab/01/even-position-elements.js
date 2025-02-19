function solve(elements) {
    console.log(elements.filter((_, i) => i % 2 == 0).join(' '));
}

solve(['20', '30', '40', '50', '60']);
