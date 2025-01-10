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
        if (result === 0)
            result = first.toLowerCase().localeCompare(second.toLowerCase());
        return result;
    });
    console.log(elements.join("\n"));
}

solve(["alpha", "beta", "gamma"]);
