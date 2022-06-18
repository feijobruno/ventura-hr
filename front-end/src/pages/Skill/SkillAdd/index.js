import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
// import useDropdownList from '../../../hooks/useDropdownList';
import api from '../../../config/configApi';
import * as yup from 'yup';

export const SkillAdd = (props) => {
    // const { actionDropdown, closeDropdownAction } = useDropdownList();
    const [id] = useState(props.match.params.id);
    const { state } = useLocation();
    const [data, setData] = useState('');
    const [dataJobSkills, setDataJobSkills] = useState([]);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const [skill, setSkill] = useState({
        skill: '',
        description: '',
        weight: '',
        profile: ''
    });

    const valueInput = e => setSkill({ ...skill, [e.target.name]: e.target.value });
    skill.id_job = id;

    const addJobSkill = async e => {
        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        if (!(await validate())) return;

        await api.post('/skills/', skill, headers)
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
                profile: yup.string("Erro: Necessário preencher o campo perfil!")
                    .required("Erro: Necessário preencher o campo perfil!"),
                weight: yup.string("Erro: Necessário preencher o campo peso!")
                    .required("Erro: Necessário preencher o campo peso!"),
                skill: yup.string("Erro: Necessário preencher o campo critério!")
                    .required("Erro: Necessário preencher o campo critério!"),
                description: yup.string("Erro: Necessário preencher o campo descrição!")
                    .required("Erro: Necessário preencher o campo descrição!")
            });

            try {
                await schema.validate({
                    profile: skill.profile,
                    weight: skill.weight,
                    skill: skill.skill,
                    description: skill.description,
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

        getJobSkills();
    }

    const getJobSkills = async (page) => {

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.get("/skills/" + id, headers)
            .then((response) => {
                if (response) {
                    setDataJobSkills(response.data.skill);
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
    useEffect(() => {
        getJob();
        getJobSkills();
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="jobs" />
                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Publicar Vaga - Dados dos Critérios</span>
                            <div className="top-content-adm-right">
                                <Link to={"/job-view/" + id}>
                                    <button type="button" className="btn btn-info btn-sm">Voltar</button>
                                </Link>{" "}

                                <Link to={"/job-edit/" + id}>
                                    <button type="button" className="btn btn-warning btn-sm">Editar</button>
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
                                        <span> Id vaga: {data.id} </span>
                                        <span className='ml-2'> Cargo: {data.title} </span>
                                        <span className='ml-2'> Empresa: {data.company} </span>
                                        <span className='ml-2'> Cidade: {data.city} / {data.uf} </span>
                                    </small>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={addJobSkill}>
                                        <div className="form-row justify-content-center">
                                            <div className="form-group col-md-3">
                                                <input type="text" className="form-control" id="skill" name="skill" placeholder="Nome" onChange={valueInput} required />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <input type="text" className="form-control" id="description" name="description" placeholder="Descrição" onChange={valueInput} required />
                                            </div>
                                            <div className="form-group col-md-2">
                                                <select name="profile" id="profile" className="form-control" onChange={valueInput} required>
                                                    <option value="" disabled selected>Perfil</option>
                                                    <option value="1">Muito baixo</option>
                                                    <option value="2">Baixo</option>
                                                    <option value="3">Médio</option>
                                                    <option value="4">Alto</option>
                                                    <option value="5">Muito alto</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <select name="weight" id="weight" className="form-control" onChange={valueInput} required>
                                                    <option value="" disabled selected>Peso</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-1">
                                                <button type="submit" className="btn btn-primary btn-sm">Inserir</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {dataJobSkills.length !== 0 ?
                                    <div className="card-body">
                                        <table className="table table-bordered table-sm text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Nome</th>
                                                    <th scope="col">Descrição</th>
                                                    <th scope="col">Perfil</th>
                                                    <th scope="col">Peso</th>
                                                    {/* <th scope="col">Ações</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataJobSkills.map(skill => (
                                                    <tr key={skill.id}>
                                                        <td>{skill.id}</td>
                                                        <td>{skill.skill}</td>
                                                        <td>{skill.description}</td>
                                                        <td>{skill.profile}</td>
                                                        <td>{skill.weight}</td>
                                                        {/* <td className="list-body-content">
                                                            <div className="dropdown-action">
                                                                <button onClick={() => { closeDropdownAction(); actionDropdown(skill.id) }} className="dropdown-btn-action">Ações</button>
                                                                <div id={"actionDropdown" + skill.id} className="dropdown-action-item">
                                                                    <Link to={"/job-view/" + skill.id}>Visualizar</Link>
                                                                    <Link to={"/job-edit/" + skill.id}>Editar Vaga</Link>
                                                                    <Link to={"/skill-add/" + skill.id}>Critérios</Link>
                                                                </div>
                                                            </div>
                                                        </td> */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    : <p className="font-weight-bold"> Nenhum critério cadastrado</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}