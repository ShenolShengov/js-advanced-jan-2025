function solve(names) {
    names.sort((first, second) => first.localeCompare(second));
    names.forEach((currentName, index) =>
        console.log(`${index + 1}.${currentName}`)
    );
}

solve(['John', 'Bob', 'Christina', 'Ema']);
