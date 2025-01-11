function solve(data) {
    const towns = data.reduce((towns, current) => {
        const [name, population] = current.split(' <-> ');
        towns[name] ??= { name, population: 0 };
        towns[name].population += +population;
        return towns;
    }, {});
    Object.values(towns).forEach((town) =>
        console.log(`${town.name} : ${town.population}`)
    );
}

solve([
    'Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000',
]);
