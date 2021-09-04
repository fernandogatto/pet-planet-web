import React from 'react';

import {
    Route,
    Redirect,
} from 'react-router-dom';

import { useAuth } from '../common/contexts/Auth';

const CustomRoute = ({ isPrivate, component: Component, ...rest }) => {
    const { user } = useAuth();

    let _isPrivate = isPrivate || false;

    return (
        <Route
            {...rest}
            render={(props) => {
                return _isPrivate === !!(
                    user && JSON.stringify(user) !== JSON.stringify({})
                ) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: _isPrivate
                                ? '/'
                                : '/dashboard',
                            state: { from: props.location },
                        }}
                    />
                )
            }}
        />
    );
}

export default CustomRoute;
