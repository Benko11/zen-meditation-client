import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { AuthProvider } from './context/AuthProvider';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RequireAuth from './components/RequireAuth';
import StartSession from './pages/StartSession';
import Session from './pages/Session';
import CompleteSession from './pages/CompleteSession';
import Preferences from './pages/Preferences';
import { AnimatePresence } from 'framer-motion';
import AnimatedRoutes from './AnimatedRoutes';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const Index = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <AnimatedRoutes />
            </BrowserRouter>
        </React.StrictMode>
    );
};

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AnimatePresence exitBeforeEnter>
                <Routes location={window.location} key={window.location as any}>
                    <Route path="/" element={<App />}>
                        <Route element={<RequireAuth />}>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/start-session"
                                element={<StartSession />}
                            />
                            <Route path="/session/:id" element={<Session />} />
                            <Route
                                path="/complete-session"
                                element={<CompleteSession />}
                            />
                            <Route
                                path="/preferences"
                                element={<Preferences />}
                            />
                        </Route>

                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
