import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import RequireAuth from './components/RequireAuth';
import CompleteSession from './pages/CompleteSession';
import Home from './pages/Home';
import { Login } from './pages/Login';
import NotFound from './pages/NotFound';
import Preferences from './pages/Preferences';
import { Register } from './pages/Register';
import Session from './pages/Session';
import StartSession from './pages/StartSession';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <>
            <Route element={<RequireAuth />}>
                <Route path="/" element={<Home />} />
                <Route path="/start-session" element={<StartSession />} />
                <Route path="/session/:id" element={<Session />} />
                <Route path="/complete-session" element={<CompleteSession />} />
                <Route path="/preferences" element={<Preferences />} />
            </Route>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<NotFound />} />
        </>
    );
};

export default AnimatedRoutes;
