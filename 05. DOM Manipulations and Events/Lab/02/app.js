function deleteByEmail() {
    const emailToDelte = document.querySelector('input[name="email"]').value;

    const forDelete = Array.from(document.querySelectorAll('tbody tr')).find(
        (tr) => tr.children[1].textContent === emailToDelte
    );

    const resultEl = document.querySelector('#result');

    if (forDelete) {
        forDelete.remove();
        resultEl.textContent = 'Deleted.';
    } else {
        resultEl.textContent = 'Not found.';
    }
}
