import React from 'react';
import styled from 'styled-components';

type Props = {
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur?: (e: React.ChangeEvent<any>) => void;
    id: string;
    label: string;
    placeholder?: string;
    autoFocus?: boolean;
    autoComplete?: boolean;
    size?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    simple?: boolean;
    style?: any;
};

const InputElement = styled.div`
    display: grid;
    grid-template-columns: 10rem auto;
    gap: 0 10px;
    align-items: center;

    label {
        text-align: right;
        cursor: pointer;
        font-size: 0.9rem;
    }

    input {
        padding: 0.3rem 0.5rem;
        border: 1px solid #acacac;
        border-radius: 2px;
        opacity: 0.85;
    }

    input:hover {
        border-color: hsl(
            var(--theme-colour2-hue),
            calc((var(--theme-colour2-saturation) - 30) * 1%),
            calc(var(--theme-colour2-lightness) * 1%)
        );
        opacity: 0.9;
    }

    input:focus {
        border-color: hsl(
            var(--theme-colour2-hue),
            calc(var(--theme-colour2-saturation) * 1%),
            calc(var(--theme-colour2-lightness) * 1%)
        );
        box-shadow: 0 0 2px var(--theme-colour2);
        opacity: 1;
    }

    @media (max-width: 768px) {
        display: flex !important;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        margin-bottom: 8px;

        input {
            align-self: stretch;
            padding: 0.5rem 0.7rem;
        }
    }
`;

export const InputField = ({
    type,
    value,
    onChange,
    onBlur,
    id,
    label,
    placeholder,
    autoFocus,
    autoComplete,
    size,
    min,
    max,
    step,
    disabled,
    simple,
    style,
}: Props) => {
    return (
        <InputElement
            style={simple ? { display: 'inline-block' } : { display: 'grid' }}
        >
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                placeholder={placeholder || ''}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                autoFocus={autoFocus || false}
                autoComplete={autoComplete ? 'on' : 'off'}
                size={size}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                style={style}
            />
        </InputElement>
    );
};
