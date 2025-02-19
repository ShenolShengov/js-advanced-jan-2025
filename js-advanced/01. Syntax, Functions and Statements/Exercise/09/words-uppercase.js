function solve(text) {
    const regex = /\w+/g;
    console.log(
        text
            .match(regex)
            .map((w) => w.toUpperCase())
            .join(', ')
    );
}

solve('Hi, How are you?');
solve('hello');
solve('Functions in JS can be nested, i.e. hold other functions');
