import { createContext, useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import axios from '../api/axios';
import Colour from '../interfaces/Colour';
import WrapperProps from '../interfaces/WrapperProps';
import getSecondColour from '../utils/getSecondColour';

const ThemeContext = createContext({});

type GlobalStylesProps = {
    colour: Colour;
};
const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
    box-sizing: border-box;
    }

    * {
    margin: 0;
    }

    html,
    body {
    height: 100%;
    }

    body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    }

    img,
    picture,
    video,
    canvas,
    svg {
    display: block;
    max-width: 100%;
    }

    input,
    button,
    textarea,
    select {
    font: inherit;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    overflow-wrap: break-word;
    }

    #root,
    #__next {
    isolation: isolate;
    }

    * {
    outline: none;
    }

    html {
    --theme-colour1-hue: ${(props: GlobalStylesProps) => props.colour.hue};
    --theme-colour1-saturation: ${(props: GlobalStylesProps) =>
        props.colour.saturation * 100};
    --theme-colour1-lightness: ${(props: GlobalStylesProps) =>
        props.colour.luminance * 100};
    --theme-colour2-hue: ${(props: GlobalStylesProps) =>
        getSecondColour(props.colour).hue};
    --theme-colour2-saturation: ${(props: GlobalStylesProps) =>
        getSecondColour(props.colour).saturation * 100};
    --theme-colour2-lightness: ${(props: GlobalStylesProps) =>
        getSecondColour(props.colour).luminance * 100};

    --theme-colour1: hsl(
    var(--theme-colour1-hue),
    calc(var(--theme-colour1-saturation) * 1%),
    calc(var(--theme-colour1-lightness) * 1%)
    );
    --theme-colour2: hsl(
    var(--theme-colour2-hue),
    calc(var(--theme-colour2-saturation) * 1%),
    calc(var(--theme-colour2-lightness) * 1%)
    );
}

body {
font-family: 'Poppins', sans-serif;
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: linear-gradient(var(--theme-colour1), var(--theme-colour2))
fixed;
}

::selection {
background-color: var(--theme-colour1);
color: #fff;
}

a {
color: var(--theme-colour1);
text-decoration: none;
font-weight: bold;
}

a:hover,
a:focus {
text-decoration: underline;
}
`;

export const ThemeProvider = ({ children }: WrapperProps) => {
    const [colour, setColour] = useState({
        hue: 0,
        saturation: 0,
        luminance: 100,
    });

    useEffect(() => {
        axios.get('/themes/default').then((res) => {
            console.log(res.data.colour);
            setColour({
                hue: res.data.colour[0],
                saturation: res.data.colour[1],
                luminance: res.data.colour[2],
            });
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ colour, setColour }}>
            <GlobalStyles colour={colour} />
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
