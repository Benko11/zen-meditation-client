import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CTA } from '../components/CTA';
import { GridForm } from '../components/GridForm.styled';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Title } from '../components/Title.styled';
import axios from '../api/axios';
import { AnimatePresence, motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import { Container } from '../components/Container.styled';
import ThemeContext from '../context/ThemeProvider';

export function Login() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const { setColour } = useContext(ThemeContext as any);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await axios.post(
                '/users/login',
                {
                    email,
                    password,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            setEmail('');
            setPassword('');
            setAuth({
                _id: result.data._id,
                name: result.data.name,
                email,
                token: result.data.token,
                preferredTheme: result.data.preferredTheme,
            });

            const accessToken = result.data.token;
            navigate('/');

            console.log(result.data);
            try {
                const theme = await axios.get(
                    `/themes/${result.data.preferredTheme}`
                );
                const { colour } = theme.data;
                setColour({
                    hue: colour[0],
                    saturation: colour[1],
                    luminance: colour[2],
                });
            } catch (err) {
                console.error('Theme:' + err);
            }
            console.log(result.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            animate={{ opacity: [0, 1], scale: [0.85, 1.02, 1] }}
            transition={{ duration: 0.5 }}
            exit={{
                opacity: [1, 0],
                scale: [1, 0.6],
                transition: { duration: 0.35 },
            }}
        >
            <Container>
                <Title>Log in</Title>
                <form onSubmit={onSubmit}>
                    <GridForm>
                        <InputField
                            type="email"
                            id="email"
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            autoFocus
                        />
                        <InputField
                            type="password"
                            id="password"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </GridForm>

                    <PrimaryButton
                        label={isLoading ? 'Processing' : 'Sign in'}
                        disabled={isLoading}
                    />
                </form>

                <CTA alternative={true}>
                    Need an account? <Link to="/register">Sign up</Link>
                </CTA>
            </Container>
        </motion.div>
    );
}
