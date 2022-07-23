import React from 'react';

export default interface FooterShowContextInterface {
    footerShow: { show: boolean };
    setFooterShow: React.Dispatch<React.SetStateAction<{ show: boolean }>>;
}
