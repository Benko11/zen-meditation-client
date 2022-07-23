import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext, useTheme } from 'styled-components';
import useFooterShow from '../hooks/useFooterShow';

const FooterElement = styled.footer`
    position: fixed;
    right: 25px;
    bottom: 25px;
    font-size: 0.75rem;
    gap: 20px;

    a {
        font-weight: normal;
        color: #fff;
        text-decoration: none;
    }

    a:hover,
    a:focus {
        text-decoration: underline;
    }
`;
export const Footer = () => {
    const { footerShow } = useFooterShow();

    return (
        <FooterElement
            style={{ display: footerShow.show ? 'inline-flex' : 'none' }}
        >
            <Link to="#">Privacy Policy</Link>
            <Link to="#">About</Link>
        </FooterElement>
    );
};
