import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import AuthContextObject from '../interfaces/AuthContextObject';
import AuthObject from '../interfaces/AuthObject';

const useAuth = () => {
    return useContext<AuthContextObject>(AuthContext as any);
};
export default useAuth;
