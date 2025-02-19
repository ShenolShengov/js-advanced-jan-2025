function solve() {
    const ingredientsQuantity = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
    };

    const recipiesIngredients = {
        apple: createRecipe(0, 1, 0, 2),
        lemonade: createRecipe(0, 10, 0, 20),
        burger: createRecipe(0, 5, 7, 3),
        eggs: createRecipe(5, 0, 1, 1),
        turkey: createRecipe(10, 10, 10, 10),
    };

    const commands = {
        restock: ([microelement, quantity]) => {
            ingredientsQuantity[microelement] += +quantity;
            return 'Success';
        },
        prepare: ([recipe, quantity]) => {
            const recipeIngedients = recipiesIngredients[recipe];
            quantity = +quantity;
            for (const ingedient in ingredientsQuantity) {
                if (
                    ingredientsQuantity[ingedient] <
                    recipeIngedients[ingedient] * quantity
                ) {
                    return `Error: not enough ${ingedient} in stock`;
                }
            }
            Object.keys(recipeIngedients).forEach((i) => {
                ingredientsQuantity[i] -= recipeIngedients[i] * quantity;
            });
            return 'Success';
        },
        report: () =>
            Object.keys(ingredientsQuantity)
                .map((i) => `${i}=${ingredientsQuantity[i]}`)
                .join(' '),
    };

    return (commandLine) => {
        const [command, ...tokens] = commandLine.split(' ');
        return commands[command](tokens);
    };

    function createRecipe(protein, carbohydrate, fat, flavour) {
        return {
            protein,
            carbohydrate,
            fat,
            flavour,
        };
    }
}

let manager = solve();
console.log(manager('restock flavour 50'));
console.log(manager('prepare lemonade 4'));
console.log(manager('restock carbohydrate 10'));
console.log(manager('restock flavour 10'));
console.log(manager('prepare apple 1'));
console.log(manager('restock fat 10'));
console.log(manager('prepare burger 1'));
console.log(manager('report'));
