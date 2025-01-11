function solve(dayOfWeek) {
    let number;

    if (dayOfWeek === 'Monday') {
        number = 1;
    } else if (dayOfWeek === 'Tuesday') {
        number = 2;
    } else if (dayOfWeek === 'Wednesday') {
        number = 3;
    } else if (dayOfWeek === 'Thursday') {
        number = 4;
    } else if (dayOfWeek === 'Friday') {
        number = 5;
    } else if (dayOfWeek === 'Saturday') {
        number = 6;
    } else if (dayOfWeek === 'Sunday') {
        number = 7;
    }

    console.log(number || 'error');
}

solve('Monday');
solve('Friday');
solve('Invalid');
