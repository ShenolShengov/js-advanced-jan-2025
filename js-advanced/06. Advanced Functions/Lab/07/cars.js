function solve(input) {
    const objects = {};

    ((data) => {
        const extrachProperties = (obj) => {
            const currentProperties = Object.entries(obj).filter(
                ([k]) => k !== 'parent'
            );
            if (obj.parent) {
                return currentProperties.concat(extrachProperties(obj.parent));
            }
            return currentProperties;
        };

        const formatProperties = (obj) => {
            return extrachProperties(obj)
                .map(([key, value]) => {
                    return `${key}:${value}`;
                })
                .join(',');
        };

        const commandHandlers = {
            create: ([name, _, parentName]) => {
                objects[name] = { parent: null };
                if (parentName) {
                    objects[name].parent = objects[parentName];
                }
            },
            set: ([name, key, value]) => {
                const currentObj = objects[name];
                currentObj[key] = value;
            },
            print: ([name]) => console.log(formatProperties(objects[name])),
        };

        data.forEach((commandLine) => {
            const [command, ...tokens] = commandLine.split(' ');
            commandHandlers[command](tokens);
        });
    })(input);
}

solve([
    'create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2',
]);

solve([
    'create pesho',
    'create gosho inherit pesho',
    'create stamat inherit gosho',
    'set pesho rank number1',
    'set gosho nick goshko',
    'print stamat',
]);
