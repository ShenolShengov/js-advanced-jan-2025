window.addEventListener('load', solve);

function solve() {

    const nextBtn = getById('next-btn');
    const preverenceList = document.querySelector('.preference-list');
    const confirmList = document.querySelector('.confirm-list');
    const thanksP = getById('thanks-text');

    const inptus = {
        scentType: getById('scent-type'),
        budget: document.querySelector('#budget'),
        occasion: getById('occasion'),
        brand: getById('brand'),
        skinType: getById('skin-type')
    };

    nextBtn.addEventListener('click', nextHandler);

    function nextHandler(e) {
        e.preventDefault();
        if(Object.values(inptus).some(i => i.value === '')){
            return;
        }
        const li = createElement('li', {className: 'content'}, preverenceList);
        const data = Object.entries(inptus).reduce((r, [k, v]) => {
            r[k] = v.value;
            return r;
        }, {});
        
        Object.assign(li.dataset, data);
        const article = createElement('article', {}, li);
        createElement('p', {textContent: `Scent Type: ${inptus.scentType.value}`}, article);
        createElement('p', {textContent: `Budget: ${inptus.budget.value} $`}, article);
        createElement('p', {textContent: `Occasion: ${inptus.occasion.value}`}, article);
        createElement('p', {textContent: `Brand: ${inptus.brand.value}`}, article);
        createElement('p', {textContent: `Skin Type: ${inptus.skinType.value}`}, article);
        const editBtn = createElement('button', {className: 'edit-btn', textContent: 'Edit'}, li);
        const conBtn = createElement('button', {className: 'continue-btn', textContent: 'Continue'}, li);

        nextBtn.disabled = true;
        thanksP.textContent = '';
        Object.values(inptus).forEach(i => i.value = '');

        editBtn.addEventListener('click', editHandler);
        conBtn.addEventListener('click', conHandler);
    }

    function conHandler(e) {
        const li = e.target.parentElement;
        Array.from(li.querySelectorAll('button')).forEach(e => e.remove());
        const confirmBtn = createElement('button', {className: 'confirm-btn', textContent: 'Confirm'}, li);
        const cancelBtn = createElement('button', {className: 'cancel-btn', textContent: 'Cancel'}, li);
        confirmList.appendChild(li);

        confirmBtn.addEventListener('click', confirmHandler);
        cancelBtn.addEventListener('click', cancelHandler);
    }

    function cancelHandler(e) {
        const li = e.target.parentElement;
        li.remove();
        nextBtn.disabled = false;
        thanksP.textContent = 'Thank you for sharing your preferences!';
    }

    function confirmHandler(e) {
        thanksP.textContent = 'Thank you for sharing your preferences!';
        cancelHandler(e);
    }

    function editHandler(e) {
        const li = e.target.parentElement;
        Object.entries(li.dataset).forEach(([id, value]) => {
            inptus[id].value = value;
        });
        li.remove();
        nextBtn.disabled = false;
    }

    function getById(id){
        return document.querySelector('#' + id);
       
    }

    function createElement(tag, properties, parent){
        const el = document.createElement(tag);
        Object.keys(properties).forEach(k => {
            if(typeof properties[k] === 'object'){
                Object.assign(el[k], properties[k]);
            } else {
                el[k] = properties[k];
            }
        })
        if(parent) parent.appendChild(el);
        return el;
    }
}

    
    
