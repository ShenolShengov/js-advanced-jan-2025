function solve(elements) {
    elements.sort((first, second) => {
        const firstLength = first.length;
        const secondLength = second.length;
        let result =
            firstLength < secondLength
                ? -1
                : firstLength === secondLength
                ? 0
                : 1;
        return result || first.toLowerCase().localeCompare(second.toLowerCase());;
    });
    console.log(elements.join('\n'));
}

solve(['alpha', 'beta', 'gamma']);
