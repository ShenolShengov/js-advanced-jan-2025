function solve(carData) {
    const car = {};
    const { model, power, color, carriage, wheelsize } = carData;
    car.model = model;
    car.engine = pickEngine(power);
    car.carriage = pickCarriage(color, carriage);
    car.wheels = pickWheels(wheelsize);

    return car;

    function pickEngine(enginePower) {
        const engines = [
            createEngine(90, 1800),
            createEngine(120, 2400),
            createEngine(200, 3500)
        ];

        return engines.find(e => e.power >= enginePower);

        function createEngine(power, volume) {
            return { power, volume };
        }
    }

    function pickCarriage(color, type) {
        return { type, color };
    }

    function pickWheels(wheelsize) {
        if (wheelsize % 2 === 0) wheelsize--;
        const wheels = [];
        wheels.length = 4;
        wheels.fill(wheelsize);
        return wheels;
    }
}

solve({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14,
});

solve({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17,
});
