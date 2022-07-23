import styled from 'styled-components';

export const RadioContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0 20px 0;

    input[type='radio'] {
        display: none;
    }

    input[type='radio'] + label {
        cursor: pointer;
        border-radius: 5px;
        border: 2px solid var(--theme-colour1);
        padding: 0.5rem 0.75rem;
        display: inline-block;
    }

    input[type='radio']:checked + label {
        background: var(--theme-colour1);
        color: #fff;
    }

    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;
