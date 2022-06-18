import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';

import api from '../../../config/configApi';
import * as yup from 'yup';

export const CandidateJobApply = (props) => {

    const [id] = useState(props.match.params.id);
    const { state } = useLocation();
    const [job, setJob] = useState('');
    const [skills, setSkills] = useState([]);
    const [candidate_skills, setCandidateSkills] = useState([]);
    

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const [job_apply, setJobApply] = useState({
        skill: '',
        profile: ''
    });

    const valueInput = e => setJobApply({ ...job_apply, [e.target.name]: e.target.value });
    job_apply.id_job = id;

    const applyJob = async e => {
        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        if (!(await validate())) return;

        await api.post('/candidates/', job_apply, headers)
            .then((response) => {
                setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem
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

        async function validate() {
            let schema = yup.object().shape({
                profile: yup.string("Erro: Necessário preencher o campo peso!")
                    .required("Erro: Necessário preencher o campo peso!"),
                skill: yup.string("Erro: Necessário preencher o campo critério!")
                    .required("Erro: Necessário preencher o campo critério!"),
            });

            try {
                await schema.validate({
                    profile: job_apply.profile,
                    skill: job_apply.skill,
                });
                return true;
            } catch (err) {
                setStatus({
                    type: 'error',
                    mensagem: err.errors
                });
                return false;
            }
        }

        getCandidateSkills();
    }

    const getCandidateSkills = async () => {

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
        getCandidateSkills();
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="jobs" />
                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Candidatar Vaga - Dados dos Critérios</span>
                            <div className="top-content-adm-right">
                                <Link to={"/candidate-job-view/" + job.id}>
                                    <button type="button" className="btn btn-info btn-sm">Voltar</button>
                                </Link>{" "}
                            </div>
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
                            <div className="card text-center">
                                <div className="card-header">
                                    <small>
                                        <span> Id vaga: {job.id} </span>
                                        <span className='ml-2'> Cargo: {job.title} </span>
                                        <span className='ml-2'> Empresa: {job.company} </span>
                                        <span className='ml-2'> Cidade: {job.city} / {job.uf} </span>
                                    </small>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={applyJob}>
                                        <div className="form-row justify-content-center">
                                            <div className="form-group col-md-3">
                                                <select name="skill" id="skill" className="form-control" onChange={valueInput} required>
                                                    <option value="" disabled selected>Critérios</option>
                                                    {skills.map(data => (
                                                        <option value={data.skill}>{data.skill}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <select name="profile" id="profile" className="form-control" onChange={valueInput} required>
                                                    <option value="" disabled selected>Experiência / Conhecimento</option>
                                                    <option value="1">Muito baixo</option>
                                                    <option value="2">Baixo</option>
                                                    <option value="3">Médio</option>
                                                    <option value="4">Alto</option>
                                                    <option value="5">Muito alto</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-1">
                                                <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-plus" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* {dataJobSkills.length !== 0 ? */}
                                <div className="card-body justify-content-center">
                                <div className="row justify-content-center mt-0">
                                        <table className="table table-bordered table-sm text-center w-50">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Critério</th>
                                                    <th scope="col">Experiência / Conhecimento</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {candidate_skills.map(candidate_skill => (
                                                    <>
                                                    <tr key={candidate_skill.id}>
                                                        <td>{candidate_skill.skill}</td>
                                                        <td>{candidate_skill.profile}</td>
                                                    </tr>
                                                    </>
                                                ))}
                                            </tbody>
                                        </table>
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