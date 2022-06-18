import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';

export const DashboardCompany = () => {

    const { state } = useLocation();
    const [jobs, setJobs] = useState([]);
    const [jobsCount, setJobsCount] = useState('');
    const [jobsRecruted, setJobsRecruted] = useState('');

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
        await api.get("/dashboard/company", headers)
            .then((response) => {
                if (response) {
                    setJobs(response.data.jobs);
                    setJobsCount(response.data.jobsCount);
                    setJobsRecruted(response.data.jobsRecruted);
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

                        <div className="alert-content-adm">
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
                        </div>
                        <div className="content-adm">
                            <div className="card text-center">

                                <div className="card-body">
                                    <div className="row mt-0 mb-0">
                                        <div className="col-md-3">
                                            <strong>Mensagens do Sistema:</strong><br /><small>Atenção: entre em contato com a administração para resolver pendências de pagamento</small>
                                        </div>
                                        <div className="col-md-8">
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
                                                            <h5 className="card-text">{jobsRecruted}</h5>
                                                            <p className="card-text">Vagas Respondidas</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1">
                            <div className="top-content-adm-right">
                            <Link to="/job-add">
                                    <button type="button" className="btn btn-primary btn-sm">Nova Vaga</button>
                                </Link>{" "}
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