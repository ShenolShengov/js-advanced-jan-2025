function solve(speed, area) {
    const speedLimit =
        area === 'motorway'
            ? 130
            : area === 'interstate'
            ? 90
            : area === 'city'
            ? 50
            : 20;
    if (speed > speedLimit) {
        const diff = speed - speedLimit;
        const speedingStatus =
            diff > 40
                ? 'reckless driving'
                : diff > 20
                ? 'excessive speeding'
                : 'speeding';
        console.log(
            `The speed is ${diff} km/h faster than the allowed speed of ${speedLimit} - ${speedingStatus}`
        );
    } else {
        console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
    }
}

solve(40, 'city');
solve(21, 'residential');
solve(120, 'interstate');
solve(200, 'motorway');
