import { assert } from 'chai';
import { createCalculator } from '../addSubtract.js';

describe('Create calculator tests', () => {
    it('Should return object with corrent properties', () => {
        const toTest = createCalculator();

        assert.notEqual(toTest.add, undefined);
        assert.equal(typeof toTest.add, 'function');

        assert.notEqual(toTest.subtract, undefined);
        assert.equal(typeof toTest.subtract, 'function');

        assert.notEqual(toTest.get, undefined);
        assert.equal(typeof toTest.get, 'function');
    });

    it("Can't modify internal sum from outside", () => {
        const toTest = createCalculator();
        assert.isUndefined(toTest.value);
    });

    it('Should get function return internal sum', () => {
        const toTest = createCalculator();
        assert.equal(toTest.get(), 0);
        toTest.add(3);
        assert.equal(toTest.get(), 3);
    });

    it('Should add function add number to internal sum', () => {
        const toTest = createCalculator();
        const expectedResult = 7;
        toTest.add(3);
        toTest.add('4');

        const acutalResult = toTest.get();

        assert.equal(acutalResult, expectedResult);
    });

    it('Should subtract function subtract number to internal sum', () => {
        const toTest = createCalculator();
        const expectedResult = 0;


        toTest.add(3);
        toTest.subtract(1);
        toTest.subtract('2');

        const acutalResult = toTest.get();

        assert.equal(acutalResult, expectedResult);
    });
});
