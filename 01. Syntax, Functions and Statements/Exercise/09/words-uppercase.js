function solve(text) {
    const regex = /[^\w\s]/g;
    text = text.replaceAll(regex, ' ');
    console.log(text.split(/\s+/).filter(e => e).map(w => w.toUpperCase()).join(', '));
}

solve('Hi, How are you?');
solve('hello');
solve('Functions in JS can be nested, i.e. hold other functions');