import React, { createContext, useEffect, useState } from 'react';
import api from '../config/configApi';

const Context = createContext();

function AuthProvider({ children }) {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accountType, setAccountType] = useState();

    useEffect(() => {

        const getLogin = async () => {
            const token = localStorage.getItem('token');

            if (token && valUser()) {
                api.defaults.headers.Authorization = `Bearer ${(token)}`;
                setAuthenticated(true);
            };
            setLoading(false);
        }
        getLogin();
    }, []);

    const valUser = async () => {
        const valueToken = localStorage.getItem('token');
        const headers = {
            'headers': {
                'Authorization': 'Bearer ' + valueToken
            }
        }

        await api.get("/login/val-token", headers)
            .then(() => {
                return true;
            }).catch(() => {
                setAuthenticated(false);
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('image');
                localStorage.removeItem('account_type');
                localStorage.removeItem('id_user');
                localStorage.removeItem('owner_id');
                api.defaults.headers.Authorization = undefined;
                return false;
            })
    }

    async function signIn(account_type) {
        setAuthenticated(true);
        setAccountType(account_type);
        //const account_type = localStorage.getItem('account_type');
       
    }

    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('account_type');
        localStorage.removeItem('image');
        localStorage.removeItem('id_user');
        localStorage.removeItem('owner_id');
        api.defaults.headers.Authorization = undefined;
    }

    if (loading) {
        return <h1>Carregando...</h1>;
    }

    return (
        <Context.Provider value={{ authenticated, signIn, handleLogout, accountType }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };