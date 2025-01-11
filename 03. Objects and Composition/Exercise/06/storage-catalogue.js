function solve(productsData) {
    const products = productsData
        .map((d) => d.split(' : '))
        .reduce((products, [name, price]) => {
            const product = { name, price: +price };
            const initialLetter = name.charAt(0);
            products[initialLetter] ??= [];
            products[initialLetter].push(product);
            return products;
        }, {});

    Object.entries(products)
        .sort((f, s) => f[0].toLowerCase().localeCompare(s[0].toLowerCase()))
        .forEach(([initialLetter, products]) => {
            console.log(initialLetter);
            products
                .sort((f, s) =>
                    f.name.toLowerCase().localeCompare(s.name.toLowerCase())
                )
                .forEach(({ name, price }) =>
                    console.log(`  ${name}: ${price}`)
                );
        });
}

solve([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10',
]);
