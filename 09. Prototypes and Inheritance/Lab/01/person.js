function createPerson(firstName, lastName) {
    const person = {firstName, lastName};
    Object.defineProperty(person, 'fullName', {
        get () {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            const isValid = /.+ .+/.test(value);
            if(!isValid) return;
            const [firstName, lastName] = value.split(' ');
            this.firstName = firstName;
            this.lastName = lastName;
        }
    });
    return person;
}

let person = createPerson("Peter", "Ivanov");
console.log(person.fullName); //Peter Ivanov
person.firstName = "George";
console.log(person.fullName); //George Ivanov
person.lastName = "Peterson";
console.log(person.fullName); //George Peterson
person.fullName = "Nikola Tesla";
console.log(person.firstName); //Nikola
console.log(person.lastName); //Tesla

let albert = createPerson("Albert", "Simpson");
console.log(albert.fullName); //Albert Simpson
albert.firstName = "Simon";
console.log(albert.fullName); //Simon Simpson
albert.fullName = "Peter";
console.log(albert.firstName);  // Simon
console.log(albert.lastName);  // Simpson
