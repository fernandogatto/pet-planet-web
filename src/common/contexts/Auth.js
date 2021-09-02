import React, { createContext, useEffect, useState, useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Api from '../helpers/Api';

import Toast from '../helpers/Toast';

import Storage from '../constants/Storage';

import AuthOperations from '../rules/Auth/AuthOperations';

// Context
const AuthContext = createContext({});

// Component
const AuthProvider = ({ children }) => {
    const {
        IsLoading: IsLoadingUser,
        HasError: HasErrorUser,
        Data: User
    } = useSelector(state => state.Auth);

    const dispatch = useDispatch();

    const [authData, setAuthData] = useState(() => {
        const user = localStorage.getItem(`@${Storage.project}:user`);

        if (user) {
            Api.defaults.headers.authorization = `Bearer ${user}`;

            return { user };
        }

        return {};
    });

    useEffect(() => {
        getUser();
    }, [authData]);

    const getUser = async () => {
        try {
            await dispatch(AuthOperations.getUserAuth());
        } catch (err) {
            console.log('AuthProvider getUser', err);
        }
    }

    const signIn = async (data) => {
        try {
            const response = await dispatch(AuthOperations.createAuth(data));

            setAuthData(response);
        } catch (err) {
            console.log('AuthProvider signIn', err);
        }
    };

    const signOut = () => {
        try {
            const response = dispatch(AuthOperations.removeAuth());

            setAuthData(response);
        } catch (err) {
            console.log('AuthProvider signOut', err);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoadingUser: IsLoadingUser,
                hasErrorUser: HasErrorUser,
                user: User,
                getUser,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Hook
const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) {
        Toast.showError('Erro de autenticação');
    }

    return context;
}

export { AuthProvider, useAuth };
