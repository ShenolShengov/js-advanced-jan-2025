function solve() {
    class Employee {
        salary = 0;
        tasks = [];

        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        work() {
            const task = this.tasks.shift();
            console.log(task);
            this.tasks.push(task);
        }

        collectSalary() {
            console.log(`${this.name} received ${this.salary} this month.`);
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [`${this.name} is working on a simple task.`];
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [
                `${this.name} is working on a complicated task.`,
                `${this.name} is taking time off work.`,
                `${this.name} is supervising junior workers.`,
            ];
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks.push(`${this.name} scheduled a meeting.`);
            this.tasks.push(`${this.name} is preparing a quarterly report.`);
            this.dividend = 0;
        }

        collectSalary() {
            console.log(
                `${this.name} received ${
                    this.salary + this.dividend
                } this month.`
            );
        }
    }

    return { Employee, Junior, Senior, Manager };
}
