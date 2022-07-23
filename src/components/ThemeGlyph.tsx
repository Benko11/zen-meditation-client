import React from 'react';
import styled from 'styled-components';
import Colour from '../interfaces/Colour';

const Circle = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;

type Props = {
    colour1: Colour;
    colour2: Colour;
};

export const ThemeGlyph = ({ colour1, colour2 }: Props) => {
    return (
        <div>
            <Circle
                style={{
                    background: `radial-gradient(hsl(${colour2.hue}, ${
                        colour2.saturation * 100
                    }%, ${colour2.luminance * 100}%) 0%, hsl(${colour1.hue}, ${
                        colour1.saturation * 100
                    }%, ${colour1.luminance * 100}%)) 30%`,
                }}
            ></Circle>
        </div>
    );
};
