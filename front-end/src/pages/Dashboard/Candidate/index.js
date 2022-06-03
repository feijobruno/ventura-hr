import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';

import useDropdownList from '../../../hooks/useDropdownList';

export const DashboardCandidate = () => {

    const { state } = useLocation();
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState("");
    const [lastPage, setLastPage] = useState("");

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const { actionDropdown, closeDropdownAction } = useDropdownList();

    const getJobs = async (page) => {

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        if (page === undefined) {
            page = 1;
        }
        setPage(page);

        await api.get("/job/jobs/" + page, headers)
            .then((response) => {
                if (response) {
                    setJobs(response.data.jobs);
                    setLastPage(response.data.lastPage);
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
                <Sidebar active="dashboard-user" />
                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <div className="top-content-adm-right">
                                <Link to="/jobs">
                                    <button type="button" className="btn-primary">Nova Vaga</button>
                                </Link>{" "}

                            </div>
                        </div>

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
                                    <div className="row">
                                        <div className="col-md-4">
                                            <strong>Mensagens do Sistema:</strong><br /><small>Atenção: entre em contato com a administração para resolver pendências de pagamento</small>
                                        </div>
                                        <div className="col-md-8">
                                            <form>
                                                <div className="form-row justify-content-center">
                                                    <div className="form-group col-md">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></div>
                                                            </div>
                                                            <input type="text" className="form-control" id="pesq01" name="pesq01" placeholder="Digite um cargo" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-md">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                                                            </div>
                                                            <input type="text" className="form-control" id="pesq02" name="pesq02" placeholder="Digite uma cidade" />
                                                        </div>
                                                    </div>
                                                    { }
                                                    <div className="form-group col-md-2">
                                                        <button type="submit" className="btn btn-primary">Buscar vagas</button>

                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-2">
                                <div className="card-header small">
                                    Vagas Publicadas
                                </div>
                                <div className="row">

                                    <div className="col-md-3">
                                        <div className="card">
                                            <h6 className="card-header"><i class="fa fa-building mr-3" aria-hidden="true"></i>Icatu Seguros</h6>
                                            <div className="card-body">
                                                <h6 className="card-title">Supervisor de Projetos e Processos</h6>
                                                <p className="card-text">With supporting text below as a natural.</p>
                                                <i className="fa fa-map-marker mr-3" aria-hidden="true"></i>
                                                <small>Rio de Janeiro</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card">
                                            <h6 className="card-header"><i class="fa fa-building mr-3" aria-hidden="true"></i>Icatu Seguros</h6>
                                            <div className="card-body">
                                                <h6 className="card-title">Supervisor de Projetos e Processos</h6>
                                                <p className="card-text">With supporting text below as a natural.</p>
                                                <i className="fa fa-map-marker mr-3" aria-hidden="true"></i>
                                                <small>Rio de Janeiro</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card">
                                            <h6 className="card-header"><i class="fa fa-building mr-3" aria-hidden="true"></i>Icatu Seguros</h6>
                                            <div className="card-body">
                                                <h6 className="card-title">Supervisor de Projetos e Processos</h6>
                                                <p className="card-text">With supporting text below as a natural.</p>
                                                <i className="fa fa-map-marker mr-3" aria-hidden="true"></i>
                                                <small>Rio de Janeiro</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card">
                                            <h6 className="card-header"><i class="fa fa-building mr-3" aria-hidden="true"></i>Icatu Seguros</h6>
                                            <div className="card-body">
                                                <h6 className="card-title">Supervisor de Projetos e Processos</h6>
                                                <p className="card-text">With supporting text below as a natural.</p>
                                                <i className="fa fa-map-marker mr-3" aria-hidden="true"></i>
                                                <small>Rio de Janeiro</small>
                                            </div>
                                        </div>
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