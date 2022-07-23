import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Container } from './components/Container.styled';
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from './context/ThemeProvider';
import rgbToHsl from '../../server/utils/rgbToHsl';
import { FooterShowProvider } from './context/FooterShowProvider';

type GlobalStylesProps = { colour: number };
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
    --theme-colour1-hue: ${(props: any) => props.colour.main};
    --theme-colour1-saturation: 50;
    --theme-colour1-lightness: 50;
    --theme-colour2-hue: calc(var(--theme-colour1-hue) - 10);
    --theme-colour2-saturation: 50;
    --theme-colour2-lightness: 60;

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

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <FooterShowProvider>
                    <Outlet />

                    <Footer />
                </FooterShowProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
