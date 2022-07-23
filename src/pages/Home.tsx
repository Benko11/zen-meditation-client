import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Title } from '../components/Title.styled';
import useAuth from '../hooks/useAuth';
import { CTA } from '../components/CTA';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/PrimaryButton';
import { Container } from '../components/Container.styled';
import FlexHorizontalAlignment from '../components/FlexHorizontalAlignment';
import axios from '../api/axios';
import UserInterface from '../interfaces/UserInterface';

const Home = () => {
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserInterface>({
        name: '',
        _id: '',
        email: '',
    });

    useEffect(() => {
        if (!('_id' in auth)) return;

        axios.get(`/users/${auth._id}`).then((res) => {
            setUser(res.data);
            setIsLoading(false);
        });
    }, [auth]);

    if (isLoading) return <p>Loading...</p>;

    return (
        <Container>
            <motion.div>
                <Title>Welcome, {user.name}</Title>

                <CTA>You have kept a streak for 18 days!</CTA>

                <FlexHorizontalAlignment
                    left={
                        <Link to="/start-session">
                            <PrimaryButton label="Start New Session" />
                        </Link>
                    }
                    right={
                        <Link to="/preferences" style={{ marginLeft: 'auto' }}>
                            Preferences
                        </Link>
                    }
                />
            </motion.div>
        </Container>
    );
};

export default Home;
