function extendPrototype(classToExtend) {
    const toExtends = {
        species: 'Human',
        toSpeciesString() {
            return `I am a ${this.species}. ${this.toString()}`;
        },
    };
    Object.assign(classToExtend.prototype, toExtends);
}
