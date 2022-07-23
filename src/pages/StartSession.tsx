import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CTA } from '../components/CTA';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { RadioContainer } from '../components/RadioContainer.styled';
import { RadioField } from '../components/RadioField';
import { Title } from '../components/Title.styled';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { Container } from '../components/Container.styled';
import FlexHorizontalAlignment from '../components/FlexHorizontalAlignment';

const StartSession = () => {
    const { auth } = useAuth();
    const [length, setLength] = useState<number>(0);
    const navigate = useNavigate();

    if (!('token' in auth)) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                '/sessions/',
                { length },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );

            console.log(response.data);
            navigate(`/session/${response.data._id}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <motion.div>
                <Title>Preparing for meditation</Title>
                <CTA>
                    Keeping daily meditation routine may prove greatly
                    beneficial to your focus and mental well-being. By keeping
                    larger streaks you can be assured of keeping good mental
                    hygiene.
                </CTA>
                <CTA>
                    Getting started?{' '}
                    <a href="#">See tips for better meditation</a>
                </CTA>
                <CTA alternative={true}>
                    How long do you want to meditate for?
                </CTA>
                <form onSubmit={handleSubmit}>
                    <RadioContainer>
                        <RadioField
                            id="length-5"
                            name="length-5"
                            label="5 minutes"
                            value={5}
                            onChange={() => setLength(5)}
                            checked={length === 5}
                        />
                        <RadioField
                            id="length-10"
                            name="length-10"
                            label="10 minutes"
                            value={10}
                            onChange={() => setLength(10)}
                            checked={length === 10}
                        />
                        <RadioField
                            id="length-15"
                            name="length-15"
                            label="15 minutes"
                            value={15}
                            onChange={() => setLength(15)}
                            checked={length === 15}
                        />
                        <RadioField
                            id="length-20"
                            name="length-20"
                            label="20 minutes"
                            value={20}
                            onChange={() => setLength(20)}
                            checked={length === 20}
                        />
                        <RadioField
                            id="length-30"
                            name="length-30"
                            label="30 minutes"
                            value={30}
                            onChange={() => setLength(30)}
                            checked={length === 30}
                        />
                        <RadioField
                            id="length-custom"
                            name="length-custom"
                            label="Custom"
                            value={-1}
                            onChange={() => setLength(-1)}
                            checked={![0, 5, 10, 15, 20, 30].includes(length)}
                        />
                        <InputField
                            label=""
                            type="number"
                            id="customLength"
                            disabled={[0, 5, 10, 15, 20, 30].includes(length)}
                            onChange={(e) => setLength(+e.target.value)}
                            onBlur={(e) => {
                                if (length % 5 !== 0) {
                                    setLength((prev) => {
                                        prev = +prev + Math.floor(5 / 2);
                                        prev = prev - (prev % 5);
                                        if (prev > 120) prev = 120;
                                        if (prev <= 0) prev = 5;
                                        return +prev;
                                    });
                                    return;
                                }

                                if (length > 120) setLength(120);
                                if (length <= 0) setLength(5);
                                setLength(+e.target.value);
                            }}
                            value={
                                [5, 10, 15, 20, 30, -1, 0].includes(length)
                                    ? ''
                                    : length
                            }
                            min={5}
                            max={120}
                            step={5}
                            simple
                            style={{ width: '3.75rem' }}
                        />
                    </RadioContainer>

                    <FlexHorizontalAlignment
                        left={
                            <PrimaryButton
                                label="Start New Session"
                                disabled={length <= 0}
                            />
                        }
                        right={
                            <Link to="/" style={{ marginLeft: 'auto' }}>
                                Back to Dashboard
                            </Link>
                        }
                    />
                </form>
            </motion.div>
        </Container>
    );
};

export default StartSession;
