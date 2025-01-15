function solve(productsData) {
    const products = productsData
        .map((d) => d.split(' | '))
        .reduce((products, [townName, productName, productPrice]) => {
            products[productName] ??= [];
            const priceInTown = processProductPrice(productPrice, townName);
            products[productName].push(priceInTown);
            return products;
        }, {});

    for (const productName in products) {
        const { price, townName } = getCheapestPriceForProduct(products[productName]);
        console.log(`${productName} -> ${price} (${townName})`);
    }

    function processProductPrice(price, townName) {
        return {price: +price, townName};
    }

    function getCheapestPriceForProduct(prices) {
        return prices.sort((f, s) =>
            f.price < s.price ? -1 : f.price === s.price ? 0 : 1
        )[0];
    }
}

// solve([
//     'Sample Town | Sample Product | 1000',
//     'Sample Town | Orange | 2',
//     'Sample Town | Peach | 1',
//     'Sofia | Orange | 3',
//     'Sofia | Peach | 2',
//     'New York | Sample Product | 1000.1',
//     'New York | Burger | 10',
// ]);

solve([
    'Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'Mexico City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Washington City | Mercedes | 1000']);
