const validations = {
    email: (e) => /^[a-z0-9_]+@[a-z]+\.[a-z]+$/.test(e),
    password: (p) => /^.{3,15}$/.test(p),
    repeatPassword: (repeatPassword) => {
        const password = document.getElementById('password')?.value;
        return /^.{3,15}$/.test(repeatPassword) && repeatPassword === password;
    },
};

export default function validate(data) {
    return Object.entries(data).every(([name, value]) => validations[name](value));
}
