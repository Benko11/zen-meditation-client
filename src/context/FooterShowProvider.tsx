import { useState } from 'react';
import { createContext } from 'react';
import WrapperProps from '../interfaces/WrapperProps';

export const FooterShowContext = createContext({});

export const FooterShowProvider = ({ children }: WrapperProps) => {
    const [footerShow, setFooterShow] = useState({ show: true });

    return (
        <FooterShowContext.Provider value={{ footerShow, setFooterShow }}>
            {children}
        </FooterShowContext.Provider>
    );
};
