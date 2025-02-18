import { expect } from 'chai';
import homeGardener from '../homeGardener.js';

describe('Tests for homeGardener', () => {
    describe('Tests for plantCareInstructions method', () => {
        it('Should thow on invalid plantType', () => {
            const invalidTypes = ['Mercedes', 'BMV', 'Suziku'];
            invalidTypes.forEach((i) => {
                expect(() => homeGardener.plantCareInstructions(i)).throw(
                    'Invalid plant type!'
                );
            });
        });

        it('Should return corrent message with succulent plantType', () => {
            const expMessage =
                'Succulents require minimal watering, indirect sunlight, and well-draining soil.';
            expect(homeGardener.plantCareInstructions('succulent')).to.equal(
                expMessage
            );
        });

        it('Should return corrent message with vegetable plantType', () => {
            const expMessage =
                'Vegetables need full sun, regular watering, and nutrient-rich soil.';
            expect(homeGardener.plantCareInstructions('vegetable')).to.equal(
                expMessage
            );
        });

        it('Should return corrent message with flowering plantType', () => {
            const expMessage =
                'Flowering plants require moderate watering, occasional fertilization, and pruning.';
            expect(homeGardener.plantCareInstructions('flowering')).to.equal(
                expMessage
            );
        });

        it('Should return corrent message with tree plantType', () => {
            const expMessage =
                'Trees need deep watering, proper spacing, and regular mulching.';
            expect(homeGardener.plantCareInstructions('tree')).to.equal(
                expMessage
            );
        });
    });

    describe('Tests for availablePlants method', () => {
        it('Should thow erro on invalid input', () => {
            const invalidInputs = [
                [{}, 2],
                [[], 2],
                [[20, 20], {}],
                [[20, 20], 0],
                [[20, 20], -2],
            ];

            invalidInputs.forEach((i) => {
                expect(() => homeGardener.availablePlants(...i)).throw(
                    'Invalid Information!'
                );
            });
        });

        it('Should return corrent message with 0 suitable plants', () => {
            const input = [[20, 40, 60, 80, 30, 35], 10];
            expect(homeGardener.availablePlants(...input)).to.equal(
                'There are 0 plants suitable for your garden height criteria!'
            );
        });

        it('Should return corrent message when have some suitable plants', () => {
            const inputs = [
                {
                    input: [[20, 40, 60, 80, 30, 35], 70],
                    expectSuitablePlants: 5,
                },
                {
                    input: [[20, 40, 60, 80, 30, 35], 25],
                    expectSuitablePlants: 1,
                },
                {
                    input: [[20, 40, 60, 80, 30, 35, 110], 120],
                    expectSuitablePlants: 7,
                },
            ];

            inputs.forEach((i) => {
                expect(homeGardener.availablePlants(...i.input)).to.equal(
                    `There are ${i.expectSuitablePlants} plants suitable for your garden height criteria!`
                );
            });
        });
    });

    describe('Tests for gardenExpenses method', () => {
        it('Sholud throw error on invalid input', () => {
            const invalidInptus = [
                [{}, {}, {}],
                [{}, [], true],
                [[], {}, true],
                [[], [], 0],
                [{}, {}, false],
                ['', '', ''],
                [0, 0, 0],
                [[], [], []],
                ['', 0, []],
            ];

            invalidInptus.forEach((i) => {
                expect(() => homeGardener.gardenExpenses(...i)).throw(
                    'Invalid Information!'
                );
            });
        });

        it('Should return corrent message without discount', () => {
            const testData = {
                input: [
                    [
                        'shovel',
                        'shovel',
                        'rake',
                        'watering can',
                        'watering can',
                    ],
                    [
                        'vegetable seeds',
                        'flower seeds',
                        'flower seeds',
                        'herb seeds',
                    ],
                    false,
                ],
                expectCost: 109,
            };

            expect(homeGardener.gardenExpenses(...testData.input))
                .to.equal(`You spent $${testData.expectCost.toFixed(2)} on tools and seeds!`);
        });

        it('Should return corrent message with discount', () => {
            const testData = {
                input: [
                    [
                        'shovel',
                        'shovel',
                        'rake',
                        'watering can',
                        'watering can',
                    ],
                    [
                        'vegetable seeds',
                        'flower seeds',
                        'flower seeds',
                        'herb seeds',
                    ],
                    true,
                ],
                expectCost: 98.10,
            };

            expect(homeGardener.gardenExpenses(...testData.input))
                .to.equal(`You spent $${testData.expectCost.toFixed(2)} on tools and seeds with a 10% discount!`);
        });
    });
});
