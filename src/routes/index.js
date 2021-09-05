import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';

import CustomRoute from './CustomRoute';

import * as Modules from './modules';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <CustomRoute
                    path="/"
                    component={Modules.SignIn}
                    exact
                />

                <CustomRoute
                    path="/sign-up"
                    component={Modules.SignUp}
                    exact
                />

                <CustomRoute
                    path="/dashboard"
                    component={Modules.Dashboard}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/adoption"
                    component={Modules.Adoption}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/adoption/pet/:id"
                    component={Modules.ViewPet}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/accommodation"
                    component={Modules.Accommodation}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/accommodation/hotel/:id"
                    component={Modules.ViewHotel}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/rescue"
                    component={Modules.Rescue}
                    exact
                    isPrivate
                />
            </Switch>
        </Router>
    )
}

export default Routes;
