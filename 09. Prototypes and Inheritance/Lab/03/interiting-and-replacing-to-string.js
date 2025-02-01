function toStringExtension() {

    function propertiesToString(obj) {
       const properties = Object.entries(obj)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        return `(${properties})`;
    }

    class Person {

        constructor(name, email) {
            this.name = name;
            this.email = email;
        }

        toString() {
            return `Person ${propertiesToString(this)}`;
        }
    }

    class Teacher extends Person {

        constructor(name, email, subject) {
            super(name, email);
            this.subject = subject;
        }

        toString() {
            return super.toString().replace('Person', 'Teacher');
        }
    }

    class Student extends Person {

        constructor(name, email, course) {
            super(name, email);
            this.course = course;
        }

        toString() {
            return super.toString().replace('Person', 'Student');
        }
    }

    return {Person, Teacher, Student};
}

