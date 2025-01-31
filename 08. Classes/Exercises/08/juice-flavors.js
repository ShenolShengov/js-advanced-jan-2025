function solve(data) {
    const juicesByQuantity = new Map();
    const juiceBottoles = new Map();

    data.forEach((current) => {
        const [name, quantity] = current.split(' => ');
        juicesByQuantity.set(
            name,
            +quantity + (juicesByQuantity.get(name) || 0)
        );
        if (juicesByQuantity.get(name) >= 1000) {
            const bottoles = Math.floor(juicesByQuantity.get(name) / 1000);
            juicesByQuantity.set(
                name,
                juicesByQuantity.get(name) - bottoles * 1000
            );
            juiceBottoles.set(name, (juiceBottoles.get(name) || 0) + bottoles);
        }
    }, new Map());

    const output = [...juiceBottoles]
        .map(([name, bottolesQuantity]) => `${name} => ${bottolesQuantity}`)
        .join('\n');
    console.log(output);
}

solve([
    'Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789',
]);
