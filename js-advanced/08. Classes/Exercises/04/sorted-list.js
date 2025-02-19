class List {

    elements = [];
    size = 0;

    add(element) {
        this.elements.push(element);
        this.#sortElements();
        this.size++;
    }

    remove(index) {
        this.#validateIndex(index);
        this.elements.splice(index, 1);
        this.#sortElements();
        this.size--;
    }

    get(index) {
        this.#validateIndex(index);
        return this.elements[index];
    }

    #validateIndex(index) {
        if (index < 0 || index >= this.elements.length) {
            this.#thorwOutOfBoundError(index);
        }
    }

    #thorwOutOfBoundError(index) {
        throw new RangeError(`${index} is out of bounds.`);
    }

    #sortElements() {
        this.elements = this.elements.sort((f, s) => f - s);
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));
