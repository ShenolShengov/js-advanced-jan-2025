class Textbox {
   
    #value;
    _elements;
    _invalidSymbols;

    constructor(selector, regex) {
        this._elements = document.querySelectorAll(selector);
        this._invalidSymbols = regex;

        [...this._elements].forEach(i => {
            i.addEventListener('input', () => {
                this.value = i.value;
            });
        });
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
        [...this._elements].forEach(e => e.value = this.value);
    }

    get elements() {
        return this._elements;
    }

    isValid() {
        return [...this.elements].every(i => !this._invalidSymbols.test(i.value));
    }
}

let textbox = new Textbox(".textbox",/[a-zA-Z0-9]+/);
let inputs = document.getElementsByClassName('textbox');
console.log(inputs);
[...inputs].forEach(i => i.addEventListener('click',function(){console.log(textbox.value);}));
