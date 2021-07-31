import {createContext} from 'react';

export const AuthContext= createContext({
    isLoggedIn: false,
    loggedInUser: null,
    token:null,
    setToken : () => {},
    setIsLoggedIn: () => {},
    setLoggedInUser: () => {},
    idd: null,
    setIdd : () => {},
    errorMessage:null,
    setErrorMessage: () => {},
    role:0,
    setRole: () => {}
});