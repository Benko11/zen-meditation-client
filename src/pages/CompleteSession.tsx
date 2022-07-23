import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/Container.styled';
import { CTA } from '../components/CTA';
import { Title } from '../components/Title.styled';
import useFooterShow from '../hooks/useFooterShow';

const CompleteSession = () => {
    const { setFooterShow } = useFooterShow();
    useEffect(() => {
        setFooterShow({ show: true });
    }, []);
    return (
        <Container>
            <Title>Session Complete</Title>
            <CTA>
                Congratulations on finishing the meditation! Make sure to come
                back tomorrow to keep your mind in check
            </CTA>

            <Link to="/">Go to Dashboard</Link>
        </Container>
    );
};

export default CompleteSession;
