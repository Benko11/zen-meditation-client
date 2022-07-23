import React from 'react';
import styled from 'styled-components';
import WrapperProps from '../interfaces/WrapperProps';

export const Container = styled.div`
    background: #efefef;
    width: 1000px;
    padding: 2rem;
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;

    @media (max-width: 1024px) {
        padding: 1.2rem 1.5rem;
        width: 800px;
        max-width: 90vw;
    }

    @media (max-width: 640px) {
        max-width: 95vw;
    }
`;
