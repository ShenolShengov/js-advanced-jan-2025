function solve(month, year) {
    const parsedDate = new Date(year, month, 0);
    console.log(parsedDate.getDate());
}

solve(1, 2012);
solve(2, 2021);
