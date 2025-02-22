const url = 'http://localhost:3030/jsonstore/collections/students';

const html = {
    table: {
        body: document.querySelector('tbody'),
    },
    inputs: [...document.querySelectorAll('input')].reduce(
        (inputs, current) => {
            inputs[current.name] = current;
            return inputs;
        },
        {}
    ),
    forms: {
        saveStudent: document.querySelector('#form'),
    },
};

const validtors = {
    firstName: (firstName) => firstName !== '',
    lastName: (lastName) => lastName !== '',
    facultyNumber: (facultyNumber) => /\d+/g.test(facultyNumber),
    grade: (grade) => Number.isFinite(Number(grade)),
};

document.addEventListener('DOMContentLoaded', attachEvents);

function attachEvents() {
    html.forms.saveStudent.addEventListener('submit', saveStudent);
}

function saveStudent(e) {
    e.preventDefault();
    console.log(isValidInputs());
    if (!isValidInputs()) {
        return;
    }
    fetch(url, {
        method: 'post',
        body: JSON.stringify(
            Object.entries(html.inputs).reduce((data, [name, input]) => {
                data[name] = input.value;
                return data;
            }, {})
        ),
    })
        .then((r) => r.json())
        .then((d) => console.log(d));
    loadStudents();
}

function isValidInputs() {
    return Object.entries(html.inputs).every(([name, input]) =>
        validtors[name](input.value)
    );
}

function loadStudents() {
    fetch(url)
        .then((r) => r.json())
        .then((studentsData) => {
            html.table.body.append(
                ...Object.values(studentsData).map(studentToTableRow)
            );
        });
}

function studentToTableRow(studentData) {
    const { firstName, lastName, facultyNumber, grade } = studentData;
    const row = document.createElement('tr');
    [firstName, lastName, facultyNumber, grade]
        .map(createTd)
        .forEach((d) => row.append(d));
    return row;
}

function createTd(textContent) {
    return Object.assign(document.createElement('td'), { textContent });
}

loadStudents();
