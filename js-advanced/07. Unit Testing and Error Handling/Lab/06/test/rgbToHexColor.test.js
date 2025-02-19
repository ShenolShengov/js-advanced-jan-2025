import { assert } from "chai";
// import { rgbToHexColor } from "../rgb-to-hex.js";

const rgbToHexColor = function (red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255))
        return undefined; // Green value is invalid
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255))
        return undefined; // Blue value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
};

describe('rgbToHexColor tests', () => {
    it('Should return undefined when have invalid input for red', () => {
        const notValidInputs = [null, -20, 400];
        const validRgbNumber = 124;

        notValidInputs.forEach(i => {
            assert.isUndefined(rgbToHexColor(i, validRgbNumber, validRgbNumber));
        });
    });

    it('Should return undefined when have invalid input for green', () => {
        const notValidInputs = [null, -20, 400];
        const validRgbNumber = 124;

        notValidInputs.forEach(i => {
            assert.isUndefined(rgbToHexColor(validRgbNumber, i, validRgbNumber));
        });
    });

    it('Should return undefined when have invalid input for blue', () => {
        const notValidInputs = [null, -20, 400];
        const validRgbNumber = 124;

        notValidInputs.forEach(i => {
            assert.isUndefined(rgbToHexColor(validRgbNumber, validRgbNumber, i));
        });
    });

    it('Should return hexColor on valid input for red, green and blue', () => {
        const input = [0, 0, 0];
        const expectedResult = '#000000';

        const actualResult = rgbToHexColor(...input);

        assert.equal(actualResult, expectedResult);
    });

    it('Should return hexColor with upperCase on valid input for red, green and blue', () => {
        const input = [255, 255, 255];
        const expectedResult = '#FFFFFF';

        const actualResult = rgbToHexColor(...input);

        assert.equal(actualResult, expectedResult);
    });
});