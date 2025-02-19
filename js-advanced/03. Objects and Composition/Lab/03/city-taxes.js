function solve(name, population, treasury) {
    return parseTown(name, population, treasury);

    function parseTown(name, population, treasury) {
        return {
            name,
            population,
            treasury,
            taxRate: 10,
            collectTaxes() {
                this.treasury += this.population * this.taxRate;
            },
            applyGrowth(percentage) {
                this.population *= 1 + percentage / 100;
            },
            applyRecession(percentage) {
                this.treasury *= 1 - percentage / 100;
            },
        };
    }
}

solve('Tortuga', 7000, 15000);
