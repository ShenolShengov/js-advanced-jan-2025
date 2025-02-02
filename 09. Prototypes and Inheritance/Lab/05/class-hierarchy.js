function solve() {
    class Figure {
        constructor(units) {
            units ??= 'cm';
            this.units = units;
        }

        #untisToCentimeters = {
            m: 0.01,
            cm: 1,
            mm: 10,
        };

        toProperUnit(value) {
            return this.#untisToCentimeters[this.units] * value;
        }

        get area() {}

        changeUnits(units) {
            this.units = units;
        }

        toString() {
            return `Figures units: ${this.units}`;
        }
    }

    class Circle extends Figure {
        constructor(radius) {
            super();
            this.radius = radius;
        }

        get area() {
            return Math.PI * this.toProperUnit(this.radius) ** 2;
        }

        toString() {
            return `${super.toString()} Area: ${this.area} - radius: ${
                this.radius
            }`;
        }
    }

    class Rectangle extends Figure {
        constructor(width, height, units) {
            super(units);
            this.width = width;
            this.height = height;
        }

        get area() {
            return (
                this.toProperUnit(this.width) * this.toProperUnit(this.height)
            );
        }

        toString() {
            const width = this.toProperUnit(this.width);
            const height = this.toProperUnit(this.height);
            return `${super.toString()} Area: ${
                this.area
            } - width: ${width}, height: ${height}`;
        }
    }
    return { Figure, Circle, Rectangle };
}

let c = new Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, 'mm');
console.log(r.area); // 1200
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

c.changeUnits('mm');
console.log(c.area); // 7853.981633974483
console.log(c.toString());
