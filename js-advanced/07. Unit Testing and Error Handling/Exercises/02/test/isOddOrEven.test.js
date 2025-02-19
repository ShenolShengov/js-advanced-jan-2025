import { expect } from "chai";
import { isOddOrEven } from "../isOddOrEven.js";

describe('Test for isOddOrEvent function', () => {
   
    it('Should return undefined when typeof argument is not strirg', () => {
        const notValidInputs = [2, null, {}, [], true, NaN, undefined];

        notValidInputs.forEach(i => {
            expect(isOddOrEven(i)).to.be.undefined;
        });
    });

    it('Should return even when is passed string with even length', () => {
        const input = 'abcd';
        const expectedResult = 'even';

        const acutalResult = isOddOrEven(input);

        expect(acutalResult).to.equal(expectedResult);
    });

    it('Should return even when is passed empty string', () => {
        const input = '';
        const expectedResult = 'even';

        const acutalResult = isOddOrEven(input);

        expect(acutalResult).to.equal(expectedResult);
    });

    it('Should return odd when is passed string with odd length', () => {
        const input = 'abcde';
        const expectedResult = 'odd';

        const acutalResult = isOddOrEven(input);

        expect(acutalResult).to.equal(expectedResult);
    });
});