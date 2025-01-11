function solve(radius) {
    const radiusType = typeof radius;
    if (radiusType !== 'number') {
        console.log(
            `We can not calculate the circle area, because we receive a ${radiusType}.`
        );
        return;
    }
    const area = Math.PI * radius ** 2;
    console.log(area.toFixed(2));
}

solve(5);
solve('name');
