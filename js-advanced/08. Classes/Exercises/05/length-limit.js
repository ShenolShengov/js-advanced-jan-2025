class Stringer {

    constructor(string, length) {
        this.innerString = string;
        this.innerLength = length;
    }

    increase(length) {
        this.innerLength+= length;
    }

    decrease(length) {
        this.innerLength -= length;
        if(this.innerLength < 0) this.innerLength = 0;
    }

    toString() {
        const dots = '...';
        if(this.innerLength == 0) {
            return dots;
        }

        if(this.innerLength >= this.innerString.length) {
            return this.innerString;
        }
        return `${this.innerString.slice(0, this.innerLength)}${dots}`;
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4); 
console.log(test.toString()); // Test