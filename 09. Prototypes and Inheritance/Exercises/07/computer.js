function createComputerHierarchy() {
    class Device {
        constructor(manufacturer) {
            this.manufacturer = manufacturer;
        }
    }

    class Keyboard extends Device {
        constructor(manufacturer, responseTime) {
            super(manufacturer);
            this.responseTime = responseTime;
        }
    }

    class Monitor extends Device {
        constructor(manufacturer, width, height) {
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }

    class Battery extends Device {
        constructor(manufacturer, expectedLife) {
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }

    class Computer extends Device {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new Error("Comptuer class can't be initialized");
            }
            super(manufacturer);
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Laptop extends Computer {
        _battery;

        constructor(
            manufacturer,
            processorSpeed,
            ram,
            hardDiskSpace,
            weight,
            color,
            battery
        ) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }

        get battery() {
            return this._battery;
        }

        set battery(battery) {
            if (!(battery instanceof Battery)) {
                throw new TypeError('Battery must be istence of Battery class');
            }
            this._battery = battery;
        }
    }

    class Desktop extends Computer {
        _keyboard;
        _monitor;

        constructor(
            manufacturer,
            processorSpeed,
            ram,
            hardDiskSpace,
            keyboard,
            monitor
        ) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }

        get keyboard() {
            return this._keyboard;
        }

        set keyboard(keyboard) {
            if (!(keyboard instanceof Keyboard)) {
                throw new TypeError(
                    'Keyboard must be istence of Keyboard class'
                );
            }
            this._keyboard = keyboard;
        }

        get monitor() {
            return this._monitor;
        }

        set monitor(monitor) {
            if (!(monitor instanceof Monitor)) {
                throw new TypeError('Monitor must be istence of Monitor class');
            }
            this._monitor = monitor;
        }
    }

    return { Device, Keyboard, Monitor, Battery, Computer, Laptop, Desktop };
}

let classes = createComputerHierarchy();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;

let battery = new Battery('Energy', 3);
console.log(battery);
let laptop = new Laptop(
    'Hewlett Packard',
    2.4,
    4,
    0.5,
    3.12,
    'Silver',
    battery
);
console.log(laptop);
