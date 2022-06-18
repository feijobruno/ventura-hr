import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';

import Moment from 'moment';

export const CandidateJobView = (props) => {

    const { state } = useLocation();
    const [id] = useState(props.match.params.id);

    const [job, setJob] = useState('');
    const [skills, setSkills] = useState([]);
    const [candidateSkills, setCandidateSkills] = useState([]);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const getCandidateJobSkills = async () => {

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }
        await api.get("/candidates/skills/" + id , headers)
            .then((response) => {
                if (response) {
                    setCandidateSkills(response.data.skill);
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
                    setJob(response.data.job);
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
                        mensagem: err.response.job.mensagem
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
        getCandidateJobSkills();
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
                       <div className="content-adm">
                            <div className="card">
                                <div className="card-header">Vaga: {job.id} - {job.title}</div>
                                <div className="card-body">
                                    Dados da Vaga <hr className="mb-0" />
                                    <dl className="row">
                                        <dt className="col-sm-3 bord ">Descrição</dt>
                                        <dd className="col-sm-9">{job.description}</dd>

                                        <dt className="col-sm-3">Empresa</dt>
                                        <dd className="col-sm-9"> {job.company} </dd>

                                        <dt className="col-sm-3">Local de trabalho</dt>
                                        <dd className="col-sm-9"> {job.city} /  {job.uf}</dd>

                                        <dt className="col-sm-3">Contrato</dt>
                                        <dd className="col-sm-9">Tipo de contratação: {job.hiring_type} - Período: {job.hiring_period} - Data Limite: {Moment(job.deadline).format('DD/MM/YYYY')}</dd>

                                        <dt className="col-sm-3">Requisitos</dt>
                                        <dd className="col-sm-9">
                                            {skills.map(skill => (
                                                <p className="m-0">{skill.skill} - {skill.description} - Experiência: {switchProfile(skill.profile)} </p>
                                            ))}
                                        </dd>
                                        <dt className="col-sm-3">Experiências do candidato</dt>
                                        <dd className="col-sm-9">
                                            {candidateSkills.map(skill => (
                                                <p className="m-0">{skill.skill} - Experiência / Conhecimento: {switchProfile(skill.profile) }</p>
                                            ))}
                                        </dd>
                                    </dl>
                                    <div className="top-content-adm-right">
                                        <Link to={"/candidate-job-apply/" + job.id}>
                                            <button type="button" className="btn-primary">Candidatar</button>
                                        </Link>{" "}
                                        <Link to="/dashboard-candidate">
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