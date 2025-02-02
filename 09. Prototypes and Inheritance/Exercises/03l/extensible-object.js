function extensibleObject() {
    return {
        extend(template) {
            Object.entries(template).forEach(([key, value]) => {
                if (typeof value === 'function') {
                    Object.getPrototypeOf(this)[key] = value;
                } else {
                    this[key] = value;
                }
            });
        },
    };
}

const template = {
    extensionMethod: function () {},
    extensionProperty: 'someString',
};

const myObj = extensibleObject();

myObj.extend(template);

console.log(myObj, '\n', Object.getPrototypeOf(myObj));
