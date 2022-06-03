import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';

import { Home } from '../pages/Home';

import { Login } from '../pages/Login';
import { AddUserLogin } from '../pages/Login/AddUserLogin';

import { RecoverPassword } from '../pages/RecoverPassword';
import { UpdatePassword } from '../pages/UpdatePassword';

import { DashboardCandidate } from '../pages/Dashboard/Candidate';
import { DashboardCompany } from '../pages/Dashboard/Company';

import { Jobs } from '../pages/Job';

import { Users } from '../pages/User';
import { AddUser } from '../pages/User/AddUser';
import { ViewUser } from '../pages/User/ViewUser';
import { EditUser } from '../pages/User/EditUser';
import { EditUserImage } from '../pages/User/EditUserImage';
import { EditUserPassword } from '../pages/User/EditUserPassword';

import { ViewProfile } from '../pages/Profile/ViewProfile';
import { EditProfile } from '../pages/Profile/EditProfile';
import { EditProfilePassword } from '../pages/Profile/EditProfilePassword';
import { EditProfileImage } from '../pages/Profile/EditProfileImage';

// import { Jobs } from '../pages/Job';
import { AddJob } from '../pages/Job/AddJob';
import { ViewJob } from '../pages/Job/ViewJob';
import { EditJob } from '../pages/Job/EditJob';

import { AddSkill } from '../pages/JobSkill/AddSkill';

import { ViewJobCandidate } from '../pages/JobCandidate/ViewJobCandidate';

function CustomRoute({ isPrivate, ...rest }) {
    const { authenticated } = useContext(Context);

    if (isPrivate && !authenticated) {
        return <Redirect to="/" />
    }
    return <Route { ...rest} />
}

export default function RoutesAdm() {
    return (
        <Switch>
            <CustomRoute exact path="/" component={Home} />
            <CustomRoute exact path="/Login" component={Login} />
            <CustomRoute exact path="/add-user-login" component={AddUserLogin} />
            <CustomRoute exact path="/recover-password" component={RecoverPassword} />
            <CustomRoute exact path="/update-password/:key" component={UpdatePassword} />

            <CustomRoute exact isPrivate path="/dashboard-user" component={DashboardCandidate} />
            <CustomRoute exact isPrivate path="/dashboard-company" component={DashboardCompany} />

            <CustomRoute exact isPrivate path="/users" component={Users} />
            <CustomRoute exact isPrivate path="/add-user" component={AddUser} />
            <CustomRoute exact isPrivate path="/view-user/:id" component={ViewUser} />
            <CustomRoute exact isPrivate path="/edit-user/:id" component={EditUser} />
            <CustomRoute exact isPrivate path="/edit-user-password/:id" component={EditUserPassword} />
            <CustomRoute exact isPrivate path="/view-profile" component={ViewProfile} />
            <CustomRoute exact isPrivate path="/edit-profile" component={EditProfile} />
            <CustomRoute exact isPrivate path="/edit-profile-password" component={EditProfilePassword} />
            <CustomRoute exact isPrivate path="/edit-profile-image" component={EditProfileImage} />
            <CustomRoute exact isPrivate path="/edit-user-image/:id" component={EditUserImage} />

            <CustomRoute exact isPrivate path="/jobs" component={Jobs} />
            <CustomRoute exact isPrivate path="/add-job" component={AddJob} />
            <CustomRoute exact isPrivate path="/view-job/:id" component={ViewJob} />
            <CustomRoute exact isPrivate path="/edit-job/:id" component={EditJob} />

            <CustomRoute exact isPrivate path="/job-candidates" component={ViewJobCandidate} />        
            
            <CustomRoute exact isPrivate path="/add-skill/:id" component={AddSkill} />
            {/* <CustomRoute exact isPrivate path="/view-skill/:id" component={ViewSkill} /> */}

        </Switch>
    );
};