const validations = {
    email: (e) => /^[a-z0-9_]+@[a-z]+\.[a-z]+$/.test(e),
    password: (p) => /^.{3,15}$/.test(p),
    repeatPassword: (repeatPassword) => {
        const password = document.getElementById('password')?.value;
        return /^.{3,15}$/.test(repeatPassword) && repeatPassword === password;
    },
    title: (t) => /[\w]{3,30}/.test(t),
    description: (d) => /.{3,2000}/.test(d),
    img: (i) => /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(i),
};

export default function validate(data) {
    return Object.entries(data).every(([name, value]) => {
        return validations[name](value);
    });
}
