function solve(elemnets, step) {
    return elemnets.filter((_, i) => i % step == 0);
}

solve(['5', '20', '31', '4', '20'], 2);

solve(['dsa', 'asd', 'test', 'tset'], 2);

solve(['1', '2', '3', '4', '5'], 6);
