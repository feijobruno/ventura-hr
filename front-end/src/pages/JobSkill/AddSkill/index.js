import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
// import { TableSkills } from './tableSkills';
import api from '../../../config/configApi';

export const AddSkill = (props) => {

    const [id] = useState(props.match.params.id);
    const { state } = useLocation(); // Não sei o que é
    const [data, setData] = useState('');
    const [dataJobSkills, setDataJobSkills] = useState([]);
    const [page, setPage] = useState("");
    const [lastPage, setLastPage] = useState("");
    // const [, setJobSkills ] = useState('');


    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const [job_skill, setSkill] = useState({
        skill: '',
        description: '',
        weight: '',
        profile: ''
    });

    const valueInput = e => setSkill({ ...job_skill, [e.target.name]: e.target.value });
    job_skill.id_job = id;

    const addJobSkill = async e => {
        e.preventDefault();

        // if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        await api.post('/job_skill/job_skill', job_skill, headers)
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

        getJobSkills();
    }

    const getJobSkills = async (page) => {

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

            if (page === undefined) {
            page = 1;
        }
        setPage(page);

        await api.get("/job_skill/job_skill/" + id + "/" + page, headers)
            .then((response) => {
                if (response) {
                    setDataJobSkills(response.data.jobSkill);
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

    const getJob = async () => {

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.get("/job/job/" + id, headers)
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
                                <Link to="/jobs">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>{" "}

                                <Link to={"/edit-job/" + data.id}>
                                    <button type="button" className="btn-warning">Editar</button>
                                </Link>{" "}
                                {/* 
                                <Link to={"#"}>
                                    <button type="button" onClick={() => deleteUser(data.id)} className="btn-danger">Apagar</button>
                                </Link> */}
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


                            {/* {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""} */}

        
                            {status.type === 'error' ? 
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">  
                                {status.mensagem}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> : ""}   

                            {status.type === 'success' ? 
                            <div className="alert alert-success alert-dismissible fade show" role="alert">  
                                {status.mensagem}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> : ""}  
                                                        
                        </div>
                        <div className="content-adm">
                            <div className="card text-center">
                                <div className="card-header">
                                    Cargo: {data.title} | Empresa: {data.company} | Cidade: {data.city} | Estado: {data.uf}
                                </div>
                                <div className="card-body">
                                <form onSubmit={addJobSkill}>
                                                <div className="form-row justify-content-center">
                                                    <div className="form-group col-md-3">
                                                        <input type="text" className="form-control" id="skill" name="skill" placeholder="Nome" />   
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <input type="text" className="form-control" id="description" name="description" placeholder="Descrição" />   
                                                    </div>

                                                    <div className="form-group col-md-2">
                                                     <select name="profile" id="profile" className="form-control" onChange={valueInput}>
                                                    <option value="1">Perfil</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-2">
                                                   <select name="weight" id="weight" className="form-control" onChange={valueInput}>
                                                    <option value="1">Peso</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                                    <div className="form-group col-md-1">
                                                        <button type="submit" className="btn btn-primary">Inserir</button>

                                                    </div>
                                                </div>
                                            </form>


                                </div>
                            </div>

                            <div className="card text-center mt-4">
                                <div className="card-header">
                                    <small>Critérios cadastrados</small>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered table-sm text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Descrição</th>
                                                <th scope="col">Perfil</th>
                                                <th scope="col">Peso</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {dataJobSkills.map(job_skill => (
                                                <tr key={job_skill.id}>
                                                    <td scope="row">{job_skill.id}</td>
                                                    <td scope="row">{job_skill.skill}</td>
                                                    <td scope="row">{job_skill.description}</td>
                                                    <td scope="row">{job_skill.profile}</td>
                                                    <td scope="row">{job_skill.weight}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="content-pagination">
                            <div className="pagination">
                                <Link to="#" onClick={() => getJobSkills(1)}><i className="fas fa-angle-double-left"></i></Link>

                                {page !== 1 ? <Link to="#" onClick={() => getJobSkills(page - 1)}>{page - 1}</Link> : ""}

                                <Link to="#" className="active">{page}</Link>

                                {page + 1 <= lastPage ? <Link to="#" onClick={() => getJobSkills(page + 1)}>{page + 1}</Link> : ""}

                                <Link to="#" onClick={() => getJobSkills(lastPage)}><i className="fas fa-angle-double-right"></i></Link>

                            </div>
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        // </div>

    )
}