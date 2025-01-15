function solve(productsData) {
    const products = productsData.reduce((products, data) => {
        const [name, price] = data.split(' : ');
        const product = {
            name,
            price: +price,
            toString() {
                return `  ${name}: ${price}`;
            },
        };
        const initialLetter = name.charAt(0);
        products[initialLetter] ??= [];
        products[initialLetter].push(product);
        return products;
    }, {});

    const sortings = {
        initialLetterAsc: (f, s) => f[0].localeCompare(s[0]),
        stringAsc: ({ name: fName }, { name: sName }) =>
            fName.localeCompare(sName),
    };

    Object.entries(products)
        .sort(sortings.initialLetterAsc)
        .forEach(([initialLetter, products]) => {
            console.log(initialLetter);
            products.sort(sortings.stringAsc).forEach((p) => console.log(p.toString()));
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
