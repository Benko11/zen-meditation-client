import React from 'react';

type Props = { left: React.ReactNode; right: React.ReactNode };

const FlexHorizontalAlignment = ({ left, right }: Props) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {left}
            <div style={{ marginLeft: 'auto' }}>{right}</div>
        </div>
    );
};

export default FlexHorizontalAlignment;
