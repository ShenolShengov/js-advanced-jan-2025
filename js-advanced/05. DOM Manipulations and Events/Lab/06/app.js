function validate() {
    const emailInput = document.querySelector('#email');

    emailInput.addEventListener('change', validateEmail);


    function validateEmail(e) {
        e.target.classList.remove('error');
        if(!e.target.value.match(/.+@.+\..+/g)) {
            e.target.classList.add('error');
        }
    }
}