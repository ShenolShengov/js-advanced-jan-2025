function addItem() {
    const newItemInput = document.querySelector('#newItemText');
    const newItemText = newItemInput.value;

    if(newItemText === '') return;

    const utemList = document.querySelector('#items');

    const newItem = document.createElement('li');
    newItem.textContent = newItemText;

    utemList.appendChild(newItem);

    newItemInput.value = '';
}