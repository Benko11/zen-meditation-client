import { createContext, useState } from 'react';
import AuthObject from '../interfaces/AuthObject';
import WrapperProps from '../interfaces/WrapperProps';

const AuthContext = createContext<{} | AuthObject>({});

export const AuthProvider = ({ children }: WrapperProps) => {
    const [auth, setAuth] = useState<AuthObject | {}>({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
