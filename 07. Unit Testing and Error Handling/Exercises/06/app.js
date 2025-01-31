function validate() {
    const emailInput = document.querySelector('#email');
    const emailValidator = e => /[a-z]+@[a-z]+\.[a-z]/.test(e);

    emailInput.addEventListener('change', (e) => {
        e.target.classList.remove('error');
        if(!emailValidator(e.target.value)) {
            e.target.classList.add('error');
        }
    });
}