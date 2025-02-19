function solve(...arguments) {
    const typesCount = {};

    arguments.forEach((a) => {
        const type = typeof a;
        console.log(`${type}: ${a}`);
        typesCount[type] ??= 0;
        typesCount[type]++;
    });

    Object.entries(typesCount)
        .sort((f, s) => s[1] - f[1])
        .forEach(([type, count]) => {
            console.log(`${type} = ${count}`);
        });
}

solve('cat', 42, function () {
    console.log('Hello world!');
});
