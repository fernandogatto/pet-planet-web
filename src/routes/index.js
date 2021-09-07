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
                    path="/adoption/create"
                    component={Modules.CreateEditPet}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/adoption/edit/pet/:id"
                    component={Modules.CreateEditPet}
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
                    path="/accommodation/create"
                    component={Modules.CreateEditHotel}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/accommodation/edit/hotel/:id"
                    component={Modules.CreateEditHotel}
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
                    path={"/rescue"}
                    component={Modules.Rescue}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path={"/rescue/create"}
                    component={Modules.CreateRescue}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/adoption-requests"
                    component={Modules.ViewAdoptionRequests}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/employees"
                    component={Modules.Employees}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/employees/create"
                    component={Modules.CreateEditEmployee}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/employees/edit/:id"
                    component={Modules.CreateEditEmployee}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/tours"
                    component={Modules.Tours}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/tours/create"
                    component={Modules.CreateEditTour}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/tours/edit/:id"
                    component={Modules.CreateEditTour}
                    exact
                    isPrivate
                />
            </Switch>
        </Router>
    )
}

export default Routes;
