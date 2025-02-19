const url = 'https://restcountries.com/v3.1/all?fields=name,capital';

fetch(url)
    .then(r => r.json())
    .then(captials => {
        captials.forEach(d => {
            console.log(`${d.name.common}: ${d.capital.join(', ')}`);
        });
    });
