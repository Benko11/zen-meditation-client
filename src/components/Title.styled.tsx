import React from 'react';
import styled from 'styled-components';

export const Title = styled.h1`
    color: hsl(
        var(--theme-colour1-hue),
        calc((var(--theme-colour1-saturation) - 10) * 1%),
        calc((var(--theme-colour1-lightness) - 10) * 1%)
    );
`;
