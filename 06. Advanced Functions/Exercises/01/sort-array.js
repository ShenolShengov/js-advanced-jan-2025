function solve(array, order) {
    const sorting = {
        asc: (f, s) => f - s,
        desc: (f, s) => s - f,
    };

    array.sort(sorting[order]);
    return array;
}
