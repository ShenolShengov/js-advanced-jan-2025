import { expect } from 'chai';
import streamingServiceSelector from '../streamingServiceSelector.js';

describe('Tests for streamingServiceSelector', () => {
    describe('Tests for method selectingContent', () => {
        it('Should thorw error if genre is not in supported list', () => {
            expect(() =>
                streamingServiceSelector.selectingContent(
                    'Movie',
                    'platform',
                    'Horror-Comedy'
                )
            ).throw(
                'We currently support these genres: Action, Comedy, Drama, Thriller, Horror, Romance, Sci-Fi.'
            );
        });

        it('Should thorw error if type is not in supported list', () => {
            expect(() =>
                streamingServiceSelector.selectingContent(
                    'Serial',
                    'platform',
                    'Comedy'
                )
            ).throw("We currently only support 'Movie' or 'TV Show' types.");
        });

        it('Should return correct message on valid input', () => {
            const type = 'Movie';
            const platform = 'X';
            const genre = 'Comedy';
            expect(
                streamingServiceSelector.selectingContent(type, platform, genre)
            ).to.equal(
                `You can watch this ${genre} ${type} on ${platform}. Enjoy your ${genre}-filled experience!`
            );
        });
    });

    describe('Tests for availablePlatforms method', () => {
        it('Should thorw error on invalid platforms or selectedPlatformIndex', () => {
            const expectedErrorMessage = 'Invalid platform selection.';

            const invalidInputs = [
                [{}, 2],
                [['Netflix', 'Disney'], 4],
                [['Netflix', 'Disney'], {}],
            ];

            invalidInputs.forEach((i) => {
                expect(() =>
                    streamingServiceSelector.availablePlatforms(...i)
                ).throw(expectedErrorMessage);
            });
        });

        it('Should remove platform on selected index and return corrent message', () => {
            const inputs = [
                {
                    input: [['Netflix', 'Disney', 'HBO'], 0],
                    expectLeftPlatforms: ['Disney', 'HBO'],
                },
                {
                    input: [['Netflix', 'Disney', 'HBO'], 1],
                    expectLeftPlatforms: ['Netflix', 'HBO'],
                },
                {
                    input: [['Netflix', 'Disney', 'HBO'], 2],
                    expectLeftPlatforms: ['Netflix', 'Disney'],
                },
            ];

            inputs.forEach((i) => {
                expect(
                    streamingServiceSelector.availablePlatforms(...i.input)
                ).to.equal(
                    `Other available platforms are: ${i.expectLeftPlatforms.join(
                        ', '
                    )}.`
                );
            });
        });
    });

    describe('Tests for contentRating method', () => {
        it('Should throw error on invalid runtime or rating', () => {
            const expectedErrorMessage = 'Invalid runtime or rating.';
            const invalidInputs = [
                [undefined, undefined],
                [{}, []],
                [-20, 2],
                [20, 20],
                [-20, 20],
            ];

            invalidInputs.forEach((i) => {
                expect(() =>
                    streamingServiceSelector.contentRating(...i)
                ).throw(expectedErrorMessage);
            });
        });

        it('Should return correct message with rating greater or equal to 7', () => {
            const inputs = [
                {
                    input: [30, 10],
                    expcetValues: [0.5, 10],
                },
                {
                    input: [60, 7],
                    expcetValues: [1, 7],
                },
                {
                    input: [90, 8],
                    expcetValues: [1.5, 8],
                },
                {
                    input: [120, 9],
                    expcetValues: [2, 9],
                },
            ];

            inputs.forEach((i) => {
                const expectedMessage = `This content is highly rated (${
                    i.expcetValues[1]
                }/10) and has a runtime of ${i.expcetValues[0].toFixed(
                    2
                )} hours. Enjoy your watch!`;
                expect(
                    streamingServiceSelector.contentRating(...i.input)
                ).to.equal(expectedMessage);
            });
        });

        it('Should return correct message with less than 7', () => {
            const inputs = [
                {
                    input: [30, 0],
                    expcetValues: [0.5, 0],
                },
                {
                    input: [60, 5],
                    expcetValues: [1, 5],
                },
                {
                    input: [90, 1],
                    expcetValues: [1.5, 1],
                },
                {
                    input: [120, 4],
                    expcetValues: [2, 4],
                },
            ];

            inputs.forEach((i) => {
                const expectedMessage = `This content has a lower rating (${
                    i.expcetValues[1]
                }/10) and runs for ${i.expcetValues[0].toFixed(
                    2
                )} hours. You might want to check reviews first.`;
                expect(
                    streamingServiceSelector.contentRating(...i.input)
                ).to.equal(expectedMessage);
            });
        });
    });
});
