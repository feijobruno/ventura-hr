import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';

import Moment from 'moment';

export const JobView = (props) => {

    const { state } = useLocation();
    const [id] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [skills, setSkills] = useState([]);
    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const getJob = async () => {

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.get("/jobs/id/" + id, headers)
            .then((response) => {
                if (response.data.job) {
                    setData(response.data.job);
                    setSkills(response.data.skill);
                } else {
                    setStatus({
                        type: 'redError',
                        mensagem: "Erro: Usuário não encontrado!"
                    });
                }

            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'redError',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'redError',
                        mensagem: "Erro: Tente mais tarde!"
                    });
                }
            })
    }

    useEffect(() => {
        getJob();
    }, [id]);

    const switchProfile = (parameter) => {
        switch (parameter) {
            case "1":
                return "Muito baixo"
            case "2":
                return "Baixo"
            case "3":
                return "Médio"
            case "4":
                return "Alto"
            case "5":
                return "Muito alto"
            default:
                return ""
        }
    }
    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="jobs" />
                <div className="wrapper">
                    <div className="row">
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
                            <div className="card">
                                <div className="card-header">Vaga: {data.id} - {data.title}</div>
                                <div className="card-body">
                                    <dl className="row">
                                        <dt className="col-sm-3 bord ">Descrição</dt>
                                        <dd className="col-sm-9">{data.description}</dd>

                                        <dt className="col-sm-3">Empresa</dt>
                                        <dd className="col-sm-9"> {data.company} </dd>

                                        <dt className="col-sm-3">Local de trabalho</dt>
                                        <dd className="col-sm-9"> {data.city} /  {data.uf}</dd>

                                        <dt className="col-sm-3">Contrato</dt>
                                        <dd className="col-sm-9">Tipo de contratação: {data.hiring_type} - Período: {data.hiring_period} - Data Limite: {Moment(data.deadline).format('DD/MM/YYYY')}</dd>

                                        <dt className="col-sm-3">Requisitos</dt>
                                        <dd className="col-sm-9">
                                            {skills.map(skill => (
                                                <p className="m-0">{skill.skill} - {skill.description} - Experiência: {switchProfile(skill.profile)} </p>
                                            ))}
                                        </dd>
                                    </dl>
                                    <div className="top-content-adm-right">
                                        <Link to={"/skill-add/" + data.id}>
                                            <button type="button" className="btn-primary">Critérios</button>
                                        </Link>{" "}
                                        <Link to={"/job-edit/" + data.id}>
                                            <button type="button" className="btn-warning">Editar</button>
                                        </Link>{" "}
                                        <Link to="/dashboard-company">
                                            <button type="button" className="btn-info">Voltar</button>
                                        </Link>{" "}
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