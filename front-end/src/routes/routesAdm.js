import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';

import { Home } from '../pages/Home';

import { Login } from '../pages/Login';
import { AddUserLogin } from '../pages/Login/AddUserLogin';
import { UpdatePassword } from '../pages/Login/UpdatePassword';
import { RecoverPassword } from '../pages/Login/RecoverPassword';

import { DashboardCandidate } from '../pages/Dashboard/Candidate';
import { DashboardCompany } from '../pages/Dashboard/Company';
import { DashboardAdm } from '../pages/Dashboard/Adm';

import { JobView } from '../pages/Job/JobView';
import { JobAdd } from '../pages/Job/JobAdd';
import { JobEdit } from '../pages/Job/JobEdit';
import { Jobs } from '../pages/Job/Jobs';

import { JobsSearch } from '../pages/Recruitment/JobSearch';
import { JobsReply } from '../pages/Job/JobReply';
import { JobScore } from '../pages/Recruitment/JobScore';
import { JobsRecruited } from '../pages/Recruitment/JobRecruited';

import { SkillAdd } from '../pages/Skill/SkillAdd';

import { CandidateDetail } from '../pages/Candidate/CandidateDetail';
import { CandidateJobView } from '../pages/Candidate/JobView';
import { CandidateJobsSearch } from '../pages/Candidate/JobsSearch';
import { CandidateJobApply } from '../pages/Candidate/JobApply';
import { Candidatures } from '../pages/Candidate/Candidatures';

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

            <CustomRoute exact isPrivate path="/dashboard-candidate" component={DashboardCandidate} />
            <CustomRoute exact isPrivate path="/dashboard-company" component={DashboardCompany} />
            <CustomRoute exact isPrivate path="/dashboard-adm" component={DashboardAdm} />
        
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
            <CustomRoute exact isPrivate path="/jobs-search" component={JobsSearch} />
            <CustomRoute exact isPrivate path="/job-add" component={JobAdd} />
            <CustomRoute exact isPrivate path="/job-view/:id" component={JobView} />
            <CustomRoute exact isPrivate path="/job-edit/:id" component={JobEdit} />
            <CustomRoute exact isPrivate path="/jobs-reply" component={JobsReply} />
            <CustomRoute exact isPrivate path="/job-score/:id" component={JobScore} />
            <CustomRoute exact isPrivate path="/job-recruited/" component={JobsRecruited} />
            <CustomRoute exact isPrivate path="/candidatures/" component={Candidatures} />

            <CustomRoute exact isPrivate path="/candidate-job-apply/:id" component={CandidateJobApply} />
            <CustomRoute exact isPrivate path="/candidate-detail/:id" component={CandidateDetail} />
            <CustomRoute exact isPrivate path="/candidate-select/:id" component={CandidateJobApply} />
            <CustomRoute exact isPrivate path="/candidate-job-view/:id" component={CandidateJobView} />
            <CustomRoute exact isPrivate path="/candidate-jobs-search" component={CandidateJobsSearch} />

            <CustomRoute exact isPrivate path="/skill-add/:id" component={SkillAdd} />
        </Switch>
    );
};