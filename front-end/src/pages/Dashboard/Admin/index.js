import React from 'react';
import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';

export const Dashboard = () => {

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="dashboard" />

                <div className="wrapper">
                    <div className="row">
                        <div className="box box-first">
                            <span className="fas fa-users"></span>
                            <span>397</span>
                            <span>Usuários</span>
                        </div>

                        <div className="box box-second">
                            <span className="fa fa-id-badge"></span>
                            <span>43</span>
                            <span>Vagas</span>
                        </div>

                        <div className="box box-third">
                            <span className="fa fa-id-card"></span>
                            <span>122</span>
                            <span>Candidatos</span>
                        </div>

                        <div className="box box-fourth">
                            <span className="fa fa-user-times"></span>
                            <span>3</span>
                            <span>Vagas sem candidatos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}