function add(number) {
    const nextNumber = Number.isNaN(Number(this)) ? number : this + number;
    const updatedFunction = add.bind(nextNumber);
    updatedFunction.toString = () => nextNumber;
    return updatedFunction;
}

console.log(add(5)(8)(5)(2).toString());
