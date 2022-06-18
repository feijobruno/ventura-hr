import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';

export const JobScore = (props) => {

    const { state } = useLocation();

    const [data, setData] = useState('');
    const [id] = useState(props.match.params.id);
    const [jobScore, setJobScore] = useState([]);
    const [candidateScore, setCandidateScore] = useState([]);

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

    const getScore = async () => {

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.get("/recruitments/job-score/" + id, headers)
            .then((response) => {
                if (response.data.jobScore) {
                    setJobScore(response.data.jobScore);
                    setCandidateScore(response.data.candidateScore);
                } else {
                    setStatus({
                        type: 'redError',
                        mensagem: "Erro: Nenhuma candidatura encontrado!"
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

    const setRecruit = async (id_job, id_candidate, company, occupation) => {
           
        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        const recruitment = { 
            id_job, 
            id_candidate,
            company,
            occupation
        }
        
        await api.post('/recruitments/', recruitment, headers)
            .then((response) => {
                setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem,
                });
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente novamente!"
                    });
                }
            });
    }

    useEffect(() => {
        getJob();
        getScore();
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="jobs" />

                <div className="wrapper">
                    <div className="row">

                    <div className="top-content-adm">
                            <span className="title-content">Selecionar Candidato</span>
                            <div className="top-content-adm-right">
                                <Link to="/jobs-reply">
                                    <button type="button" className="btn-info">Voltar</button>
                                </Link>
                            </div>
                        </div>
                        <div className="alert-content-adm">
                        {status.type === 'success' ?
                                <Redirect to={{
                                    pathname: '/jobs-reply',
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} />
                                : ""}

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
                                <div className="card-header">
                                    <small>
                                        <span> Id vaga: {data.id} </span>
                                        <span className='ml-2'> Cargo: {data.title} </span>
                                        <span className='ml-2'> Empresa: {data.company} </span>
                                        <span className='ml-2'> Cidade: {data.city} / {data.uf} </span>
                                    </small>
                                </div>
                                    {jobScore.length !== 0 ?
                                        <div className="card-body">
                                            <table className="table table-bordered table-sm text-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Rank</th>
                                                        <th scope="col">Cargo</th>
                                                        <th scope="col">Candidato</th>
                                                        <th scope="col">Score desejado</th>
                                                        <th scope="col">Score candidato</th>
                                                        <th scope="col">Ação</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {jobScore.map(score => (
                                                        <tr key={score.id_score}>
                                                            <td>{score.candidate_rank}</td>
                                                            <td>{score.title}</td>
                                                            <td>{score.name}</td>
                                                            <td>{score.score_job}</td>
                                                            <td>{score.score}</td>
                                                            <td>{
                                                                <button type="button" className="btn btn-primary btn-sm" onClick={() => setRecruit(score.id_job, score.id_candidate, data.company, data.title)} >Selecionar</button>
                                                            }</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                    :<div className="row mt-0 justify-content-center text-center">   
                                        <div className="alert alert-danger alert-dismissible fade show col-md-4" role="alert">Nenhum candidato para a vaga
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div> 
                                    </div> 
                                    }
                                    {candidateScore.length !== 0 ?
                                       <div className="row mt-0">
                                            <table className="table table-bordered table-sm text-center" style={{fontSize: "6px"}}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Candidato</th>
                                                        <th scope="col">Requisitos</th>
                                                        <th scope="col">Experiência</th>
                                                        <th scope="col">PMD</th>
                                                        <th scope="col">Peso</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {candidateScore.map(score => (
                                                        <tr key={score.name} >
                                                            <td>{score.name}</td>
                                                            <td>{score.skill}</td>
                                                            <td>{score.profile_candidate}</td>
                                                            <td>{score.profile_job}</td>
                                                            <td>{score.weight}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            </div>
                                        : " "
                                    }    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}