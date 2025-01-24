function solve(commands) {
    let list = [];

    (function (lines) {
        lines.forEach((commandLine) => {
            const [command, value] = commandLine.split(' ');
            if (command === 'print') {
                console.log(list.join(','));
            } else if (command === 'add') {
                list.push(value);
            } else {
                list = list.filter((e) => e !== value);
            }
        });
    })(commands);
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);
solve(['add pesho', 'add george', 'add peter', 'remove peter', 'print']);
