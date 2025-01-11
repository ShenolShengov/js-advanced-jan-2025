function solve(data) {
    const foods = data.reduce((foods, current, index, foodsData) => {
        if (index % 2 !== 0) return foods;
        foods[current] = +foodsData[index + 1];
        return foods;
    }, {});
    console.log(foods);
}

solve(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']);
solve(['Potato', '93', 'Skyr', '63', 'Cucumber', '18', 'Milk', '42']);
