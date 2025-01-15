function focused() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach((i) => {
        i.addEventListener('focus', (e) => {
            e.target.closest('div').classList.add('focused');
        });

        i.addEventListener('blur', (e) => {
            e.target.closest('div').classList.remove('focused');
        });
    });
}
