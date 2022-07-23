import Colour from '../interfaces/Colour';

export default function getSecondColour(colour1: Colour): Colour {
    return {
        hue: colour1.hue + 5,
        saturation: colour1.saturation + 0.15,
        luminance: colour1.luminance - 0.1,
    };
}
