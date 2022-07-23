import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Title } from '../components/Title.styled';
import { GridForm } from '../components/GridForm.styled';
import { PrimaryButton } from '../components/PrimaryButton';
import { InputField } from '../components/InputField';
import { Link } from 'react-router-dom';
import { CTA } from '../components/CTA';
import { motion } from 'framer-motion';
import { Container } from '../components/Container.styled';

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | AxiosError>();

    useEffect(() => {
        if (error != null) console.error(error);
    }, [error]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/register`,
                {
                    name,
                    email,
                    password,
                    passwordConfirmation,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(result);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setIsError(true);
                setError(err);
            }
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
                <Title>Sign up</Title>

                <CTA>
                    Create an account to start tracking your meditation sessions
                    and streaks.
                </CTA>

                <form onSubmit={onSubmit}>
                    <GridForm>
                        <InputField
                            id="name"
                            type="text"
                            label="Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="e.g. John Doe"
                            autoFocus
                        />
                        <InputField
                            id="email"
                            type="email"
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="buddha@example.com"
                        />
                        <InputField
                            id="password"
                            type="password"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <InputField
                            id="passwordConfirmation"
                            type="password"
                            label="Password again"
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                            value={passwordConfirmation}
                        />
                    </GridForm>

                    <PrimaryButton
                        label={isLoading ? 'Processing' : 'Create account'}
                        disabled={isLoading}
                    />
                </form>

                <CTA alternative={true}>
                    Have an account? <Link to="/login">Log in</Link>
                </CTA>
            </Container>
        </motion.div>
    );
}
