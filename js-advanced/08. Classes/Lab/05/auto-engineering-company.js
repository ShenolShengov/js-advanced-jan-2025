function solve(input) {
    const brandProducesCars = input.reduce((brandProducesCars, carData) => {
        const [brand, model, producedCars] = carData.split(' | ');
        if(!brandProducesCars.has(brand)) brandProducesCars.set(brand, new Map());
        const currentProducedCars = brandProducesCars.get(brand).get(model) || 0;
        brandProducesCars.get(brand).set(model, currentProducedCars + Number(producedCars));
        return brandProducesCars;
    }, new Map());

    for (const [model, producedCars] of brandProducesCars) {
        console.log(model);
        for (const [brand, count] of producedCars) {
            console.log(`###${brand} -> ${count}`);
        }
    }        

}

console.log(
    solve(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'])
);