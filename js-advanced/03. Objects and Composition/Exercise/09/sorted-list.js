function createSortedList() {
    return {
        elements: [],
        size: 0,
        add(element) {
            this.elements.push(element);
            this.elements.sort((f, s) => f < s ? - 1 : f == s ? 0 : 1);
            this.size++;
        },
        remove(index) {
            if(!isValidIndex(index, this.elements.length)) return;
            this.elements.splice(index, 1);
            this.size--;
        },
        get(index) {
            return this.elements[index];
        }
    }

    function isValidIndex(index, length){
        return index >= 0 && index < length;
    }
}

let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));