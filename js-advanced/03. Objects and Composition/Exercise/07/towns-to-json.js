function solve(townsData) {
    townsData.shift();
    const parsedTowns = townsData
        .map((d) => d.split(/\s*\|\s*/g).filter((e) => e))
        .reduce((towns, [name, lat, lon]) => {
            towns.push({
                Town: name,
                Latitude: Number((+lat).toFixed(2)),
                Longitude: Number((+lon).toFixed(2)),
            });
            return towns;
        }, []);
    console.log(JSON.stringify(parsedTowns));
}

solve([
    '| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |',
]);
