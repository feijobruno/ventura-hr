import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';

export const DashboardCandidate = () => {

    const { state } = useLocation();
    const [jobs, setJobs] = useState([]);
    const [candidatesCount, setCandidatesCount] = useState('');
    const [jobsRecrutedCount, setJobsRecrutedCount] = useState('');

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const getJobs = async () => {

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }
        await api.get("/dashboard/user", headers)
            .then((response) => {
                if (response) {
                    setJobs(response.data.jobs);
                    setCandidatesCount(response.data.candidatesCount);
                    setJobsRecrutedCount(response.data.jobsRecrutedCount);
                }
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente mais tarde!"
                    });
                }
            });
    }


    useEffect(() => {
        getJobs();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="dashboard" />
                <div className="wrapper">
                    <div className="row">
                        <div className="content-adm">
                            <div className="card text-center">

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <small><strong>Mensagens do Sistema:</strong><br />
                                                Atenção: entre em contato com a administração para resolver pendências de pagamento</small>
                                        </div>
                                        <div className="col-md-9">
                                            {/* <div className="row justify-content-center mb-0"> */}
                                            <div className="row justify-content-center mb-0">
                                                <div className="col-sm-4">
                                                    <div className="card text-white bg-primary text-center">
                                                    <Link to="/candidatures" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <div className="card-body">
                                                            <h4 className="card-title"><span className="fa fa-id-badge fa-lg"></span></h4>
                                                            <h5 className="card-text">{candidatesCount}</h5>
                                                            <p className="card-text">Candidaturas</p>
                                                        </div>
                                                    </Link>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="card text-white bg-success text-center">
                                                        <Link to="/job-recruited" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                            <div className="card-body">
                                                                <h4 className="card-title"><span className="fa fa-id-badge fa-lg"></span></h4>
                                                                <h5 className="card-text">{jobsRecrutedCount}</h5>
                                                                <p className="card-text">Vagas recrutadas</p>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-2">
                                <div className="card-header small">
                                    Últimas Vagas Publicadas
                                </div>
                                <div className="row justify-content-center">
                                    <div className="card-deck">
                                        {jobs.map(job => (
                                            <div className="card" key={job.id}>
                                                <h6 className="card-header"><i className="fa fa-building mr-3" aria-hidden="true"></i>{job.company}</h6>
                                                <Link to={"/candidate-job-view/" + job.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <div className="card-body">
                                                        <h6 className="card-title">{job.title}</h6>
                                                        <p className="card-text"><small>{job.description}</small></p>
                                                        <i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
                                                        <small>{job.city}</small>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}