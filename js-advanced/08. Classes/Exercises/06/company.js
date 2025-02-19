class Company {
    departments = {};

    addEmployee(name, salary, position, departemnt) {
        this.#validateInputs(name, salary, position, departemnt);
        this.departments[departemnt] ??= [];
        this.departments[departemnt].push({ name, salary, position });
        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }


    bestDepartment() {
        const bestDepartement = Object.entries(this.departments)
            .map(([department, employees]) => {
                const avgSalary =
                    employees
                        .map((e) => e.salary)
                        .reduce((sum, c) => sum + c, 0) / employees.length;
                return { name: department, avgSalary };
            })
            .sort((f, s) => s.avgSalary - f.avgSalary)[0];
        bestDepartement.employees = this.departments[bestDepartement.name];

        let result = `Best Department is: ${
            bestDepartement.name
        }\nAverage salary: ${bestDepartement.avgSalary.toFixed(2)}\n`;

        result += bestDepartement.employees
            .sort((f, s) => s.salary - f.salary || f.name.localeCompare(s.name))
            .map((e) => `${e.name} ${e.salary} ${e.position}`)
            .join('\n');

        return result;
    }

    #isValidInput(input) {
        const numberCheck = typeof input == 'number' ? input >= 0 : true;
        return input !== '' && input != null && numberCheck;
    }

    #validateInputs(...inputs) {
        if (inputs.some((i) => !this.#isValidInput(i))) {
            throw new Error('Invalid input!');
        }
    }
}