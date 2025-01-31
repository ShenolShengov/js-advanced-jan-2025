function validate() {
    const createInputValidator = (
        id,
        validator,
        onValidationSuccess,
        onValidationFailure
    ) => {
        return {
            input: document.querySelector(`#${id}`),
            validator,
            onValidationSuccess,
            onValidationFailure,
            validate() {
                const isValid = this.isValid;
                if (isValid) {
                    onValidationSuccess(this);
                } else {
                    onValidationFailure(this);
                }
                return isValid;
            },
            get isValid() {
                return this.validator(this.input.value);
            },
        };
    };

    function getRegisterFormValidators() {
        const onValid = (inputValidator) =>
            (inputValidator.input.style.border = 'none');

        const onError = (inputValidator) => {
            inputValidator.input.style.border = '2px solid red';
        };

        const getInputValue = (id) => document.querySelector(`#${id}`).value;
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        const passwordRegex = /^\w{5,15}$/;
        const emailRegex = /^.*@.*\..*$/;

        const validators = {
            username: createInputValidator(
                'username',
                (u) => usernameRegex.test(u),
                onValid,
                onError
            ),
            email: createInputValidator(
                'email',
                (e) => emailRegex.test(e),
                onValid,
                onError
            ),
            password: createInputValidator(
                'password',
                (p) =>
                    passwordRegex.test(p)  &&
                    p === getInputValue('confirm-password')
                    ,
                onValid,
                onError
            ),
            'confirm-password': createInputValidator(
                'confirm-password',
                (confirmP) =>
                    passwordRegex.test(confirmP)  &&
                    confirmP === getInputValue('password')
                    ,
                onValid,
                onError
            ),
            companyNumber: createInputValidator(
                'companyNumber',
                (companyNumber) => {
                    const isCompany =
                        document.querySelector('#company').checked;
                    console.log(
                        !isCompany ||
                            (+companyNumber >= 1000 && +companyNumber <= 9999)
                    );
                    return (
                        !isCompany ||
                        (+companyNumber >= 1000 && +companyNumber <= 9999)
                    );
                },
                (v) => {
                    if(document.querySelector('#company').checked) {
                        onValid(v);
                    }
                },
                (v) => {
                    if(document.querySelector('#company').checked) {
                        onError(v);
                    }
                }
            ),
        };

        return validators;
    }

    const validators = getRegisterFormValidators();
    const registerForm = document.querySelector('#registerForm');

    // registerForm.addEventListener('change', (e) => {
    //     if (e.target.matches('input:not([type="checkbox"])')) {
    //         validators[e.target.id].validate();
    //     }
    // });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isValid = [
            ...document.querySelectorAll('input:not([type="checkbox"])'),
        ]
            .map((i) => validators[i.id].validate())
            .every((i) => i);

        document.querySelector('#valid').style.display = isValid
            ? 'block'
            : 'none';
    });

    const isCompanyCheckBox = document.querySelector('#company');

    isCompanyCheckBox.addEventListener('change', (e) => {
        document.querySelector('#companyInfo').style.display = e.target.checked
            ? 'block'
            : 'none';
    });
}