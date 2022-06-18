import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import api from '../../config/configApi';

export const Home = () => {

    const { state } = useLocation();
    const [jobs, setJobs] = useState([]);

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
        await api.get("/home/", headers)
            .then((response) => {
                if (response) {
                    setJobs(response.data.jobs);
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
            <style>
                {`.logo{
            padding: 10px;
            margin-right: 300px;
        }
        .btn-success{
            margin-left: 30px;
        }

        `}
            </style>
            <div>
                <nav className="navbar">
                    <div className="navbar-content">
                        <img src="/logo.png" alt="ventura" className="logo" />
                        <Link to="/login">
                            <button type="submit" className="btn btn-primary btn-sm">Entrar</button>
                        </Link>
                        <Link to="/add-user-login">
                            <button type="submit" className="btn btn-success btn-sm">Cadastra-se gratuitamente</button>
                        </Link>
                    </div>
                </nav>
            </div>
            <div className="alert-content-adm">
                {status.type === 'success' ?
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {status.mensagem}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> : ""}

                {status.type === 'error' ?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {status.mensagem}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> : ""}
            </div>
            <div className="content-adm">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-2">
                        Últimas vagas cadastradas
                        <div class="card-columns mt-1">
                            {jobs.map(job => (

                                <div className="card" key={job.id}>
                                    <h6 className="card-header"><i className="fa fa-building mr-3" aria-hidden="true"></i>{job.company}</h6>
                                    <div className="card-body">
                                        <h6 className="card-title">{job.title}</h6>
                                        <p className="card-text"><small>{job.description}</small></p>
                                        <i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
                                        <small>{job.city}</small>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}