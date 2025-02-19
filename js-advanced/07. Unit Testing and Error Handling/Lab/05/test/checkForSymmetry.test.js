import { assert, expect } from 'chai';
import { isSymmetric } from '../checkForSymmetry.js';

describe('Test for isSymetric function with mocha and chai', () => {
    it('Should return false when argument is not array', () => {
        const notValidInputs = [
            {},
            2,
            'String',
            undefined,
            null,
            NaN,
            '',
            0,
            false,
        ];

        notValidInputs.forEach((i) => {
            assert.isFalse(isSymmetric(i));
        });
    });

    it('Should return false if array types are differnt', () => {
        const input = [1, 2, '1'];

        const actualResult = isSymmetric(input);

        expect(actualResult).to.be.false;
    });

    it('Sholud return true on empty array', () => {
        const input = [];

        const actualResult = isSymmetric(input);

        expect(actualResult).to.be.true;
    });

    it('Should return true on array of one element', () => {
        const input = [1];

        const actualResult = isSymmetric(input);

        expect(actualResult).to.be.true;
    });

    it('Should return true on symetric array', () => {
        const input = [1, 2, 1];

        const actualResult = isSymmetric(input);

        expect(actualResult).to.be.true;
    });

    it('Should return false on non-symetric array', () => {
        const input = [1, 2, 3];

        const actualResult = isSymmetric(input);

        expect(actualResult).to.be.false;
    });
});
