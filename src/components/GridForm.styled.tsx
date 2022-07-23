import React from 'react';
import styled from 'styled-components';
import WrapperProps from '../interfaces/WrapperProps';

export const GridForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 0 10px 0;

    .item {
        display: grid;
        grid-template-columns: 10rem auto;
        gap: 0 10px;
        align-items: center;
    }

    .item label {
        text-align: right;
        cursor: pointer;
        font-size: 0.9rem;
    }
`;
