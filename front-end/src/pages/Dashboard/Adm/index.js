import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';

export const DashboardAdm = () => {

    const { state } = useLocation();
    const [jobs, setJobs] = useState([]);
    const [jobsCount, setJobsCount] = useState('');
    const [users, setUsers] = useState('');
    const [candidates, setCandidates] = useState('');

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
        await api.get("/dashboard/admin", headers)
            .then((response) => {
                if (response) {
                    setJobs(response.data.jobs);
                    setJobsCount(response.data.jobsCount);
                    setUsers(response.data.usersCount);
                    setCandidates(response.data.candidatesCount);
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
                        {/* <div className="top-content-adm">
                            <div className="top-content-adm-right">
                            <Link to="/job-add">
                                    <button type="button" className="btn btn-primary">Nova Vaga</button>
                                </Link>{" "}
                            </div>
                        </div> */}

                        {/* <div className="alert-content-adm">
                            {status.type === 'redSuccess' ?
                                <Redirect to={{
                                    pathname: '/jobs',
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}

                            {status.type === 'redError' ?
                                <Redirect to={{
                                    pathname: '/jobs',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                        </div> */}
                        <div className="content-adm">
                            <div className="card text-center">
                                <div className="card-body mb-0">
                                    <div className="row justify-content-center">
                                        <div className="col-md-9">
                                            <div className="row justify-content-center mb-0">
                                                <div className="col-sm-4">
                                                    <div className="card text-white bg-primary text-center">
                                                        <div className="card-body">
                                                            <h4 className="card-title"><span className="fa fa-id-badge fa-lg"></span></h4>
                                                            <h5 className="card-text">{jobsCount}</h5>
                                                            <p className="card-text">Vagas Cadastradas</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="card text-white bg-success text-center">
                                                        <div className="card-body">
                                                            <h4 className="card-title"><span className="fa fa-id-badge fa-lg"></span></h4>
                                                            <h5 className="card-text">{users}</h5>
                                                            <p className="card-text">Usuários Cadastrados</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="card text-white bg-warning text-center">
                                                        <div className="card-body">
                                                            <h4 className="card-title"><span className="fa fa-id-badge fa-lg"></span></h4>
                                                            <h5 className="card-text">{candidates}</h5>
                                                            <p className="card-text">Candidatos Cadastrados</p>
                                                        </div>
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
                                                <Link to={"/job-view/" + job.id } style={{ textDecoration: 'none', color: 'inherit' }}>
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