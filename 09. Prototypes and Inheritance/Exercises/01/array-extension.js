(function solve() {
    const arrProp = Array.prototype;

    arrProp.last = function ()  {
        return this[this.length - 1];
    }

    arrProp.skip = function (n) {
        return this.slice(n);
    }

    arrProp.take = function (n) {
        return this.slice(0, n);
    }

    arrProp.sum = function () {
        return this.reduce((acc, c) => acc + c, 0);
    };

    arrProp.average = function () {
        return this.sum() / this.length;
    }
})();

const arr = [1, 2, 3, 4];

console.log(arr.sum());