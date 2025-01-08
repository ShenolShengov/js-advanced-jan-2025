function solve(steps, footPrintInMeters, speed) {
    speed *= 0.277777778;

    const distanecInMeteres = steps * footPrintInMeters;
    let time = distanecInMeteres / speed;
    time += Math.floor(distanecInMeteres / 500) * 60;
    const seconds = String(Math.round(time % 60)).padStart(2, '0');
    const minutes = String(Math.floor(time / 60 % 60)).padStart(2, '0')
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    console.log(`${hours}:${minutes}:${seconds}`);
}

solve(4000, 0.60, 5);
solve(2564, 0.70, 5.5);
