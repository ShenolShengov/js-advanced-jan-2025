function solve(data, criteria) {
    JSON.parse(data)
        .filter((e) => isFufillCritera.call(e, criteria))
        .forEach((e, index) => {
            console.log(`${index}. ${e.first_name} ${e.last_name} - ${e.email}`);
        });

    function isFufillCritera(criteria) {
        if (criteria === 'all') return true;
        const [property, value] = criteria.split('-');
        return this[property] === value;
    }
}

solve(
    `[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`,
    'gender-Female'
);
