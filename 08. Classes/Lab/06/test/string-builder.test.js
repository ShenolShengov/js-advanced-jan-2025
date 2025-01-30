import { expect } from 'chai';
import StringBuilder from '../string-builder.js';

describe('Test for class StringBuilder', () => {
    const errorDataOnInvalidInput = [TypeError, 'Argument must be a string'];
    const notValidInputs = [20, true, NaN, null, [], {}];

    function testWithInvalidInputs(functionToThrow, functionName) {
        it(
            'Should throw TypeError if argument is not of type string ' +
                functionName,
            () => {
                notValidInputs.forEach((i) =>
                    expect(() => functionToThrow(i)).to.throw(
                        ...errorDataOnInvalidInput
                    )
                );
            }
        );
    }

    describe('Constuctor tests', () => {
        testWithInvalidInputs((i) => new StringBuilder(i), 'Constuctor');

        it('Should assing empty array on undefined argument', () => {
            const toTest = new StringBuilder(undefined);
            expect(toTest._stringArray).to.eql([]);
        });

        it('Should assing arugment as _stringArray', () => {
            const input = 'Input';
            const expcetedReslut = ['I', 'n', 'p', 'u', 't'];
            const toTest = new StringBuilder(input);
            expect(toTest._stringArray).to.eql(expcetedReslut);
        });
    });

    describe('Test for append functions', () => {
        testWithInvalidInputs((i) => {
            const toTest = new StringBuilder('test');
            toTest.append(i);
        }, 'Append function');

        it('Should append in the end of array passed string', () => {
            const input = ['Test', ' To'];
            const expectedResult = ['T', 'e', 's', 't', ' ', 'T', 'o'];
            const toTest = new StringBuilder(input[0]);
            toTest.append(input[1]);
            expect(toTest._stringArray).to.eql(expectedResult);
        });
    });

    describe('Test for prepend functions', () => {
        testWithInvalidInputs((i) => {
            const toTest = new StringBuilder('test');
            toTest.prepend(i);
        }, 'Prepend function');

        it('Should append in the start of array passed string', () => {
            const input = ['Test', 'To'];
            const expectedResult = ['T', 'o', 'T', 'e', 's', 't'];
            const toTest = new StringBuilder(input[0]);
            toTest.prepend(input[1]);
            expect(toTest._stringArray).to.eql(expectedResult);
        });
    });

    describe('Test for insertAt functions', () => {
        testWithInvalidInputs((i) => {
            const toTest = new StringBuilder('test');
            toTest.prepend(i);
        }, 'insertAt function');

        it('Should insert in specified index array from  passed string', () => {
            const input = ['Test', 'To', 1];
            const expectedResult = ['T', 'T', 'o', 'e', 's', 't'];
            const toTest = new StringBuilder(input[0]);
            toTest.insertAt(input[1], input[2]);
            expect(toTest._stringArray).to.eql(expectedResult);
        });
    });

    describe('Test for remove functions', () => {
        testWithInvalidInputs((i) => {
            const toTest = new StringBuilder('test');
            toTest.prepend(i);
        }, 'remove function');

        it('Should remove element from start index with given length', () => {
            const input = ['Test', 1, 2];
            const expectedResult = ['T', 't'];
            const toTest = new StringBuilder(input[0]);
            toTest.remove(input[1], input[2]);
            expect(toTest._stringArray).to.eql(expectedResult);
        });
    });

    describe('Test for toString() function', () => {
        const input = 'To Test';
        const expectedResult = 'To Test';
        const toTest = new StringBuilder(input);
        expect(toTest.toString()).to.equal(expectedResult);
    });

    describe('Test for static method _vrfyParam', () => {
        testWithInvalidInputs(
            (i) => StringBuilder._vrfyParam(i),
            'static _vrfyParam function'
        );

        it('Should do nothing when arugment is type of string', () => {
            const input = 'Some string';
            expect(() => toTest(input)).to.not.throw(
                ...errorDataOnInvalidInput
            );
        });
    });
});
