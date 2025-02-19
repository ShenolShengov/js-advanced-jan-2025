import { expect } from "chai";
import { mathEnforcer } from "../mathEnforcer.js";

describe('Test for mathEnforrcer object', () => {
    describe('Test for function addFive', () => {
        it('Should return undefined when is num argument is not of type number', () => {
            const notValidInputs = ['20', '', null, [], undefined, true];
            notValidInputs.forEach((i) => expect(mathEnforcer.addFive(i)).to.be.undefined);
        });

        it('Should return NaN when num argument is NaN', () => {
            expect(mathEnforcer.addFive(NaN)).to.be.NaN;
        });

        it('Should return correct result with positive integer', () => {
            const inputs = [
                { input: 5, expect: 10 },
                { input: 0, expect: 5 },
                { input: 2, expect: 7 },
            ];

            inputs.forEach((d) => expect(mathEnforcer.addFive(d.input)).to.equal(d.expect));
        });

        it('Should return corrent result with negative integers', () => {
            const inputs = [
                { input: -2, expect: 3 },
                { input: -5, expect: 0 },
                { input: -7, expect: -2 },
            ];

            inputs.forEach((d) => expect(mathEnforcer.addFive(d.input)).to.equal(d.expect));
        });

        it('Should return corrent result with floating point numbers (postive and negatives)', () => {
            const inputs = [
                { input: 2.5, expect: 7.5 },
                { input: -4.5, expect: 0.5 },
                { input: 7.1, expect: 12.1 },
                { input: -5.5, expect: -0.5 },
            ];

            inputs.forEach((d) =>
                expect(mathEnforcer.addFive(d.input)).to.be.closeTo(d.expect, 0.01)
            );
        });
    });

    describe('Tests for function subtractTen', () => {

        it('Should return undefinied when num argument is not of type number', () => {
            const notValidInputs = ['20', '', null, [], undefined, true];
            notValidInputs.forEach((i) => expect(mathEnforcer.subtractTen(i)).to.be.undefined);
        });

        it('Should return NaN when num argument is NaN', () => {
            expect(mathEnforcer.subtractTen(NaN)).to.be.NaN;
        });

        it('Should return correct result with positive integer', () => {
            const inputs = [
                { input: 15, expect: 5 },
                { input: 10, expect: 0 },
                { input: 20, expect: 10 },
            ];

            inputs.forEach((d) => expect(mathEnforcer.subtractTen(d.input)).to.equal(d.expect));
        });

        it('Should return corrent result with negative integers', () => {
            const inputs = [
                { input: -2, expect: -12 },
                { input: -5, expect: -15 },
                { input: 5, expect: -5 },
            ];

            inputs.forEach((d) => expect(mathEnforcer.subtractTen(d.input)).to.equal(d.expect));
        });

        it('Should return corrent result with floating point numbers (postive and negatives)', () => {
            const inputs = [
                { input: -2.5, expect: -12.5 },
                { input: 12.2, expect: 2.2 },
                { input: 7.1, expect: -2.9 },
                { input: -15.5, expect: -25.5 },
            ];

            inputs.forEach((d) =>
                expect(mathEnforcer.subtractTen(d.input)).to.be.closeTo(d.expect, 0.01)
            );
        });
    });

    describe('Tests for function sum', () => {
        
        it('Should return undefined when one of passed numbers is not of type number', () => {
            const notValidInputs = [
                [2, null],
                [true, 4],
                [undefined, 4],
                [4, []],
            ];
            notValidInputs.forEach((i) => expect(mathEnforcer.sum(...i)).to.be.undefined);
        });

        it('Should return NaN when num argument is NaN', () => {
            expect(mathEnforcer.sum(NaN, 4)).to.be.NaN;
            expect(mathEnforcer.sum(4, NaN)).to.be.NaN;
        });

        it('Should return correct result with positive integer', () => {
            const inputs = [
                { input: [15, 5], expect: 20 },
                { input: [10, 7], expect: 17 },
                { input: [3, 3], expect: 6 },
            ];

            inputs.forEach((d) => expect(mathEnforcer.sum(...d.input)).to.equal(d.expect));
        });

        it('Should return corrent result with negative integers', () => {
            const inputs = [
                { input: [-2, 2], expect: 0 },
                { input: [-5, -5], expect: -10 },
                { input: [-7, 2], expect: -5 },
            ];

            inputs.forEach((d) => expect(mathEnforcer.sum(...d.input)).to.equal(d.expect));
        });

        it('Should return corrent result with floating point numbers (postive and negatives)', () => {
            const inputs = [
                { input: [5, -2.5], expect: 2.5 },
                { input: [7.2, 2], expect: 9.2 },
                { input: [-7.1, 4], expect: -3.1 },
                { input: [4, 4.4], expect: 8.4 },
            ];

            inputs.forEach((d) =>
                expect(mathEnforcer.sum(...d.input)).to.be.closeTo(d.expect, 0.01)
            );
        });
    });
});
