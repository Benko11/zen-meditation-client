import styled from 'styled-components';

const CTAElement = styled.p`
    margin: 0.75rem 0;
`;

const CTAAlternativeElement = styled.p`
    margin: 1.5rem 0 0 0;
    color: #3a3a3a;
`;

export const CTA = ({
    alternative = false,
    children,
}: {
    alternative?: boolean;
    children: React.ReactNode | React.ReactNode[];
}) => {
    if (alternative)
        return <CTAAlternativeElement>{children}</CTAAlternativeElement>;
    return <CTAElement>{children}</CTAElement>;
};
