import { assert, expect } from 'chai';
import { sum } from '../sum.js';

describe('Sum tests', () => {
    it('Should sum all numbers', () => {
        const input = [1, 2, 3, 4, 5];
        const expectedResult = 15;

        const actualResult = sum(input);

        expect(actualResult).to.equal(expectedResult);
    });

    it('Should return zero on empty array', () => {
        const input = [];
        const expectedResult = 0;

        const actualResult = sum(input);

        assert.equal(actualResult, expectedResult);
    });

    it('Should sum negative numbers', () => {
        const input = [-1, -2, -3, -4];
        const expectedResult = -10;

        const actualResult = sum(input);

        assert.equal(actualResult, expectedResult);
    });
});
