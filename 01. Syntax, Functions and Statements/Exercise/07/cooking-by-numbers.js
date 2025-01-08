function solve(num, ...commands) {
    const commandsActions = {
        chop: (num) => num / 2,
        dice: (num) => Math.sqrt(num),
        spice: (num) => ++num,
        bake: (num) => num *= 3,
        fillet: (num) => num *= 0.8
    };
    num = +num;
    for(const command of commands) {
        num = commandsActions[command](num);
        console.log(num);
    }
}

solve('32', 'chop', 'chop', 'chop', 'chop', 'chop');
solve('9', 'dice', 'spice', 'chop', 'bake', 'fillet');