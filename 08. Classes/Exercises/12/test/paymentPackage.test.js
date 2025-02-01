import { expect } from 'chai';
import PaymentPackage from '../paymentPackage.js';

const assertSetterValidations = (setter, message, ...invalidInputs) => {
    invalidInputs.forEach((i) => {
        expect(() => setter(i)).to.throw(Error, message);
    });
};

describe('Tests for PaymentPackage class', () => {
    describe('Tests for constucotr', () => {
        it('Should initialize all properties', () => {
            const toTest = new PaymentPackage('Some package Name Shengov', 50);

            const expectedName = 'Some package Name Shengov';
            const expectedValue = 50;
            const expectedVAT = 20;
            const expectedActive = true;

            expect(toTest.name).to.equal(expectedName);
            expect(toTest.value).to.equal(expectedValue);
            expect(toTest.VAT).to.equal(expectedVAT);
            expect(toTest.active).to.equal(expectedActive);
        });
    });

    describe('Tests for name accessor-mutator methods', () => {
        it('Get method return correct value', () => {
            const expectedName = 'Test Shengov';
            const toTest = new PaymentPackage('Test Shengov', 40);
            expect(toTest.name).equal(expectedName);
        });

        it('Set method thorw error on invalid type or value for name', () => {
            const toTest = new PaymentPackage('Test Shengov', 40);

            const invalidNames = [20, null, undefined, [], {}, true, ''];
            const expectedMessageOnError = 'Name must be a non-empty string';

            assertSetterValidations(
                (i) => (toTest.name = i),
                expectedMessageOnError,
                invalidNames
            );
        });

        it('Set method shoud set value on valid input', () => {
            const expectedName = 'Some other value Shengov';
            const toTest = new PaymentPackage('Test Shengov', 40);
            toTest.name = expectedName;
            expect(toTest.name).equal(expectedName);
        });
    });

    describe('Tests for value accessor-mutator methods', () => {
        it('Get method return correct value', () => {
            const expectedValue = 0;
            const toTest = new PaymentPackage('Test Shengov', 0);
            expect(toTest.value).equal(expectedValue);
        });

        it('Set method thorw error on invalid type or value for value', () => {
            const toTest = new PaymentPackage('Test Shengov', 15);

            const invalidValues = [-20, null, undefined, [], {}, true, ''];

            const expectedMessageOnError =
                'Value must be a non-negative number';
            assertSetterValidations(
                (i) => (toTest.value = i),
                expectedMessageOnError,
                invalidValues
            );
        });

        it('Set method shoud set value on valid input', () => {
            const expectedValue = 60;
            const toTest = new PaymentPackage('Test Shengov', 40);
            toTest.value = expectedValue;
            expect(toTest.value).equal(expectedValue);
        });
    });

    describe('Tests for VAT accessor-mutator methods', () => {
        it('Get method return correct value', () => {
            const expectedVAT = 20;
            const toTest = new PaymentPackage('Test Shengov', 42);
            expect(toTest.VAT).equal(expectedVAT);
        });

        it('Set method thorw error on invalid type or value for value', () => {
            const toTest = new PaymentPackage('Test Shengov', 70);

            const invalidValues = [-20, null, undefined, [], {}, true, ''];

            const expectedMessageOnError = 'VAT must be a non-negative number';
            assertSetterValidations(
                (i) => (toTest.VAT = i),
                expectedMessageOnError,
                invalidValues
            );
        });

        it('Set method shoud set value on valid input', () => {
            const expectedVAT = 60;
            const toTest = new PaymentPackage('Test Shengov', 50);
            toTest.VAT = expectedVAT;
            expect(toTest.VAT).equal(expectedVAT);
        });
    });

    describe('Tests for active accessor-mutator methods', () => {
        it('Get method return correct value', () => {
            const expectedActive = true;
            const toTest = new PaymentPackage('Test Shengov', 27);
            expect(toTest.active).equal(expectedActive);
        });

        it('Set method thorw error on invalid type or value for value', () => {
            const toTest = new PaymentPackage('Test Shengov', 40);

            const invalidValues = [-20, null, undefined, [], {}, ''];

            const expectedMessageOnError = 'Active status must be a boolean';
            assertSetterValidations(
                (i) => (toTest.active = i),
                expectedMessageOnError,
                invalidValues
            );
        });

        it('Set method shoud set value on valid input', () => {
            const expectedActive = false;
            const toTest = new PaymentPackage('Test Shengov', 1);
            toTest.active = expectedActive;
            expect(toTest.active).equal(expectedActive);
        });
    });

    describe('Tests for toSting() method', () => {
        it('Should return corrent result - active status', () => {
            const expectedResult =
                'Package: Test Shengov\n- Value (excl. VAT): 20\n- Value (VAT 50%): 30';

            const toTest = new PaymentPackage('Test Shengov', 20);
            toTest.VAT = 50;

            expect(toTest.toString()).to.equal(expectedResult);
        });

        it('Should return corrent result - not active status', () => {
            const expectedResult =
                'Package: Test Shengov (inactive)\n- Value (excl. VAT): 40\n- Value (VAT 50%): 60';

            const toTest = new PaymentPackage('Test Shengov', 40);
            toTest.VAT = 50;
            toTest.active = false;

            expect(toTest.toString()).to.equal(expectedResult);
        });
    });
});
