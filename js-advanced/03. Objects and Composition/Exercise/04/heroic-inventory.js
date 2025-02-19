function solve(heroesData) {
    const heroes = heroesData
        .filter(e => e)
        .map((d) => d.split(' / '))
        .reduce((heroes, [name, level, items]) => {
            const hero = {
                name,
                level: +level,
                items: items ? items.split(', ') : [],
            };
            heroes.push(hero);
            return heroes;
        }, []);
    return JSON.stringify(heroes);
}

solve([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara',
    ''
]);

solve(['Jake / 1000 / Gauss, HolidayGrenade']);
