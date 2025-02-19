function addItem() {
    const newItemInput = document.querySelector('#newItemText');
    const newItemText = newItemInput.value;

    if(newItemText === '') return;

    const utemList = document.querySelector('#items');

    const newItem = document.createElement('li');
    newItem.textContent = newItemText;

    const deleteLink = document.createElement('a');
    deleteLink.textContent = '[Delete]';
    deleteLink.href = '#';

    deleteLink.addEventListener('click', deleteItem);

    newItem.appendChild(deleteLink);

    utemList.appendChild(newItem);

    newItemInput.value = '';

    function deleteItem(e) {
        e.target.parentElement.remove();
    }
}