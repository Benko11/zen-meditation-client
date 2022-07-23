import React from 'react';

type Props = {
    name: string;
    id: string;
    value: number | string;
    label: string;
    disabled?: boolean;
    checked?: boolean;
    onChange: (e: React.ChangeEvent<any>) => void;
};

export const RadioField = ({
    id,
    name,
    value,
    label,
    disabled,
    checked,
    onChange,
}: Props) => {
    return (
        <div>
            <input
                type="radio"
                name={name}
                id={id}
                value={value}
                disabled={disabled || false}
                checked={checked || false}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};
