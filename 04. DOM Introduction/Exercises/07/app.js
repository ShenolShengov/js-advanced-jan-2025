function solve() {
    document.querySelector('#btnSend').addEventListener('click', onClick);

    function onClick() {
        const bestResturantElement =
            document.querySelector('#bestRestaurant p');
        const bestWorkersElement = document.querySelector('#workers p');

        const input = parseInput(document.querySelector('textarea').value);

        const resturants = processResturants(input);

        const bestResturant = getBestResturant(resturants);

        bestResturantElement.textContent = bestResturantMessage(bestResturant);
        console.log(bestResturant.workers);
        bestWorkersElement.textContent = bestWorkersMessage(
            bestResturant.workers
        );

        function bestWorkersMessage(workers) {
            return workers
                .sort((a, b) =>
                    a.salary < b.salary ? 1 : a.salary == b.salary ? 0 : -1
                )
                .map(
                    (worker) =>
                        `Name: ${worker.name} With Salary: ${worker.salary}`
                )
                .join(' ');
        }

        function bestResturantMessage(bestResturant) {
            return `
          Name: ${
              bestResturant.name
          } Average Salary: ${bestResturant.avgSalary.toFixed(
                2
            )} Best Salary: ${bestResturant.bestSalary.toFixed(2)}`;
        }

        function processResturants(input) {
            const resturants = input.reduce((acc, data) => {
                const [name, workersData] = data.split(' - ');
                const workers = parseWorkers(workersData);

                const resturant = acc.find((e) => e.name == name);
                if (resturant) {
                    console.log('here');
                    resturant.workers = resturant.workers.concat(workers);
                } else {
                    acc.push({ name, workers });
                }
                return acc;
            }, []);

            resturants.forEach((resturant) => {
                setAvgSalary(resturant);
                setBestSalary(resturant);
            });

            return resturants;
        }

        function setAvgSalary(resturant) {
            const avgSalary = calculateAvgSalary(resturant.workers);
            resturant.avgSalary = avgSalary;
        }

        function setBestSalary(resturant) {
            const bestSalary = getBestSalary(resturant.workers);
            resturant.bestSalary = bestSalary;
        }

        function getBestResturant(resturants) {
            return resturants.sort((a, b) =>
                a.avgSalary < b.avgSalary
                    ? 1
                    : a.avgSalary == b.avgSalary
                    ? 0
                    : -1
            )[0];
        }

        function calculateAvgSalary(workers) {
            return (
                workers.map((e) => e.salary).reduce((acc, c) => acc + c, 0) /
                workers.length
            );
        }

        function getBestSalary(workers) {
            return workers
                .map((e) => e.salary)
                .sort((a, b) => (a < b ? 0 : a == b ? 1 : -1))[0];
        }

        function parseInput(input) {
            return JSON.parse(input);
        }

        function parseWorkers(workersData) {
            return workersData.split(', ').reduce((workers, cur) => {
                const [name, salary] = cur.split(' ');
                workers.push({
                    name,
                    salary: +salary,
                });
                return workers;
            }, []);
        }
    }
}
