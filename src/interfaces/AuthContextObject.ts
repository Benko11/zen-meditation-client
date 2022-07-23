import React from 'react';
import AuthObject from './AuthObject';

export default interface AuthContextObject {
    auth: {} | AuthObject;
    setAuth: React.Dispatch<React.SetStateAction<AuthObject>>;
}
