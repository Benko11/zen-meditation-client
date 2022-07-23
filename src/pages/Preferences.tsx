import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { Container } from '../components/Container.styled';
import { CTA } from '../components/CTA';
import { GridForm } from '../components/GridForm.styled';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { RadioContainer } from '../components/RadioContainer.styled';
import { RadioField } from '../components/RadioField';
import { SectionTitle } from '../components/SectionTitle.styled';
import { Title } from '../components/Title.styled';
import ThemeContext from '../context/ThemeProvider';
import useAuth from '../hooks/useAuth';

const Preferences = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { auth } = useAuth();
    const { setColour } = useContext(ThemeContext as any);
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState('Loading...');
    const [currentTheme, setCurrentTheme] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (!('token' in auth)) return;

        axios.get(`/users/${auth._id}`).then((res) => {
            setName(res.data.name);
            setEmail(res.data.email);
            setCurrentTheme(res.data.preferredTheme);

            axios.get('/themes').then((res) => {
                setThemes(res.data);
                setLoading(false);
                setLoadingText('Applying theme settings...');
            });
        });
    }, []);

    useEffect(() => {
        if (name.trim() === '' || email.trim() === '')
            return setIsDisabled(true);
        setIsDisabled(false);
    }, [name, email]);

    useEffect(() => {
        if (themes.length === 0) return;

        const theme = themes.find((t: any) => t._id === currentTheme);
        const { colour } = theme as any;

        axios
            .patch(
                `/sessions/${currentTheme}/toggle-theme`,
                {},
                {
                    headers: { Authorization: `Bearer ${(auth as any).token}` },
                }
            )
            .then((res) => {
                setColour({
                    hue: colour[0],
                    saturation: colour[1],
                    luminance: colour[2],
                });
                setLoading(false);
            });
    }, [currentTheme]);

    const onPersonalInfoUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsDisabled(true);
        try {
            const result = await axios.patch(
                '/sessions/update-info',
                {
                    name,
                    email,
                },
                {
                    headers: { Authorization: `Bearer ${(auth as any).token}` },
                }
            );
            setIsDisabled(false);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <Container>{loadingText}</Container>;

    return (
        <Container>
            <Title>Preferences</Title>
            <CTA alternative={false}>
                Customize your experience of the app or administer your account.
            </CTA>
            <form onSubmit={onPersonalInfoUpdate}>
                <SectionTitle>Personal information</SectionTitle>

                <GridForm>
                    <InputField
                        type="text"
                        id="name"
                        label="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />

                    <InputField
                        type="email"
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </GridForm>

                <PrimaryButton
                    label={
                        isDisabled && name.trim() !== '' && email.trim() !== ''
                            ? 'Processing'
                            : 'Update'
                    }
                    disabled={isDisabled}
                />
            </form>
            <form style={{ marginTop: '2rem' }}>
                <SectionTitle>Theme</SectionTitle>

                <RadioContainer>
                    {themes.map((theme: any) => (
                        <RadioField
                            id={theme._id}
                            label={theme.name}
                            name="theme"
                            onChange={(e) => {
                                setCurrentTheme(e.target.value);
                                setLoading(true);
                            }}
                            value={theme._id}
                            key={theme._id}
                            checked={theme._id === currentTheme}
                        />
                    ))}
                </RadioContainer>
            </form>
            {/* <button
                onClick={() => {
                    setFooterShow({ show: false });
                }}
            >
                d
            </button> */}
            {/* <button
                onClick={() => {
                    axios
                        .post('/themes', {
                            name: 'Enigmatic Purple',
                            colour: '#6217b9',
                            interval: 5,
                        })
                        .then((res) => console.log(res.data))
                        .catch((err) => console.error(err));
                }}
            >
                add theme
            </button> */}
            <Link to="/">Go back to Dashboard</Link>
        </Container>
    );
};

export default Preferences;
