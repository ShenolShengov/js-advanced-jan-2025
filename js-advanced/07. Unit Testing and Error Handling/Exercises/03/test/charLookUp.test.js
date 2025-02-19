import { expect } from "chai";
import { lookupChar } from "../charLookUp.js";

describe('Tests for lookupChar', () => {

    it('Sholud return undefined string argument is not of type string', () => {
        const input = [20, 20];

        expect(lookupChar(...input)).to.be.undefined;
    });

    it('Sholud return undefined index is not of type number', () => {
        const input = ['text', 'text'];

        expect(lookupChar(...input)).to.be.undefined;
    });

    it('Sholud return undefined index is of type number, BUT is not integer', () => {
        const input = ['text', 20.5];

        expect(lookupChar(...input)).to.be.undefined;
    });

    it('Should return "Incorrect index" when index is greater or equal to string.lengnth', () => {
        const inputs = [
            ['text', 4],
            ['text', 20]
        ];
        const expectedResult = 'Incorrect index';
        inputs.forEach(i => expect(lookupChar(...i)).to.equal(expectedResult));
    });

    it('Should return "Incorrect index" when index is below zero', () => {
        const inputs = [
            ['text', -1],
            ['text', -3]
        ];
        const expectedResult = 'Incorrect index';
        inputs.forEach(i => expect(lookupChar(...i)).to.equal(expectedResult));
    });

    it('Should return char in that index on valid input data', () => {
        const inputsWithExpecetdResult = [
            {
                input: ['text', 2],
                expect: 'x'
            },
            {
                input: ['some other text', 0],
                expect: 's'
            }
        ];

        inputsWithExpecetdResult.forEach(d => {
            expect(lookupChar(...d.input)).to.equal(d.expect);
        });
    })
});