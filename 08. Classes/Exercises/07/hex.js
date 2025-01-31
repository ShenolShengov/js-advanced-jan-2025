class Hex {
    constructor(value) {
        this.value = value;
    }

    valueOf() {
        return this.value;
    }

    toString() {
        const hexHavlue = this.value
            .toString(16)
            .split('')
            .map((e) => e.toUpperCase())
            .join('');
        return `0x${hexHavlue}`;
    }

    plus(number) {
        return new Hex(this.value + number);
    }

    minus(number) {
        return new Hex(this.value - number);
    }

    parse(string) {
        return parseInt(string, 16);
    }
}
