function solve() {
    let string = '';

    return {
        append(toAppend) {
            string += toAppend;
        },
        removeStart(n) {
            string = string.slice(n);
        },
        removeEnd(n) {
            string = string.slice(0, -n);
        },
        print() {
            console.log(string);
        },
    };
}

let firstZeroTest = solve();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();

let secondZeroTest = solve();

secondZeroTest.append('123');
secondZeroTest.append('45');
secondZeroTest.removeStart(2);
secondZeroTest.removeEnd(1);
secondZeroTest.print();
