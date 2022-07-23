import React from 'react';
import styled from 'styled-components';

const ButtonElement = styled.button`
    background-image: linear-gradient(
        22.5deg,
        hsl(
            var(--theme-colour1-hue),
            calc(var(--theme-colour1-saturation) * 1%),
            calc(var(--theme-colour1-lightness) * 1%)
        ),
        hsl(
            var(--theme-colour1-hue),
            calc(var(--theme-colour1-saturation) * 1%),
            calc((var(--theme-colour1-lightness) - 5) * 1%)
        )
    );
    border: none;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 1px;
    padding: 0.75rem 1.75rem;
    color: #fff;
    border-radius: 100px;
    cursor: pointer;

    &:hover,
    &:focus {
        background-image: none;
        background-color: hsl(
            var(--theme-colour1-hue),
            calc(var(--theme-colour1-saturation) * 1%),
            calc((var(--theme-colour1-lightness) - 5) * 1%)
        );
    }

    &:focus {
        box-shadow: 0 0 0 2px var(--theme-colour2);
    }

    &:disabled {
        background-image: none;
        background-color: hsl(
            var(--theme-colour1-hue),
            calc(var(--theme-colour1-saturation) * 1%),
            85%
        );
    }
`;

export const PrimaryButton = ({
    label,
    disabled = false,
}: {
    label: String;
    disabled?: boolean;
}) => {
    return (
        <ButtonElement type="submit" disabled={disabled}>
            {label}
        </ButtonElement>
    );
};
