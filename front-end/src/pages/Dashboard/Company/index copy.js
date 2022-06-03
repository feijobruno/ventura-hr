import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';

import useDropdownList from '../../../hooks/useDropdownList';

export const DashboardCompany = () => {

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

        await api.get("/job/jobs/"  + page, headers)
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
                <Sidebar active="dashboard-company" />
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
                                {/* <div className="card-header small">
                                    Vagas Disponíveis
                                </div> */}
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <strong>Mensagens do Sistema:</strong><br />Atenção: entre em contato com a administração para resolver pendências de pagamento
                                        </div>
                                        <div className="col-md-6">
                                        <strong>Suas Vagas Publicadas:</strong>
                                            <table className="table table-bordered table-sm text-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Cargo</th>
                                                        <th scope="col">Data Fim</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {dataJobSkills.map(job_skill => (
                                                        <tr key={job_skill.id}> */}
                                                        <tr>
                                                            <td scope="row">Teste</td>
                                                            <td scope="row">Teste</td>
                                                            <td scope="row"><i className="fa fa-folder-open" aria-hidden="true"></i></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Teste</td>
                                                            <td scope="row">Teste</td>
                                                            <td scope="row"><i className="fa fa-folder-open" aria-hidden="true"></i></td>
                                                        </tr>
                                                    {/* ))} */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>                                
                                </div>
                            </div>

                            <div className="card text-center mt-2">
                                <div className="card-header small">
                                    Vagas Disponíveis
                                </div>
                                <div className="card-body">
                                    {/* <form onSubmit={addJobSkill}> */}
                                    <form>                    
                                        <div className="form-row justify-content-center">
                                            <div className="form-group col-md-3">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                    <div className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></div>
                                                    </div>
                                                    <input type="text" className="form-control" id="pesq01" name="pesq01" placeholder="Digite um cargo ou empresa" />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                                                    </div>
                                                    <input type="text" className="form-control" id="pesq02" name="pesq02" placeholder="Digite uma cidade" />
                                                </div>




                                                {/* <input type="text" className="form-control" name="description" id="description" placeholder="Digite uma cidade"  /> */}
                                            </div>
                                            {/* <div className="form-group col-md-1">
                                                <label for="profile">Perfil</label>
                                                <select name="profile" id="profile" className="form-control" >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-1">
                                                <label for="weight">Peso</label>
                                                <select name="weight" id="weight" className="form-control" >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div> */}
                                            <div className="form-group col-md-2">
                                                <button type="submit" className="btn btn-primary">Buscar vagas</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card text-center mt-2">
                                {/* <div className="card-header small">
                                    Critérios cadastrados
                                </div> */}
                                <div className="card-body">
                                    {/* <table className="table table-striped"> */}
                                    <table className="table table-bordered table-sm">

                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Descrição</th>
                                                <th scope="col">Empresa</th>
                                                <th scope="col">Cidade</th>
                                                <th scope="col">Ações</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {jobs.map(job => (
                                                <tr key={job.id}>
                                                    <td scope="row">{job.id}</td>
                                                    <td scope="row">{job.title}</td>
                                                    <td scope="row">{job.description}</td>
                                                    <td scope="row">{job.company}</td>
                                                    <td scope="row">{job.city}</td>
                                                    <td scope="row">
                                                    {/* <i className="fa fa-folder-open" aria-hidden="true"></i> */}
                                                    <div className="dropdown-action">
                                                    <button onClick={() => { closeDropdownAction(); actionDropdown(job.id) }} className="dropdown-btn-action">Ações</button>
                                                    <div id={"actionDropdown" + job.id} className="dropdown-action-item">
                                                        <Link to={"/view-job/" + job.id}>Visualizar</Link>
                                                        <Link to={"/edit-job/" + job.id}>Editar Vaga</Link>
                                                        <Link to={"/add-skill/" + job.id}>Critérios</Link>
                                                    </div>
                                            </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="content-pagination">
                                        <div className="pagination">
                                            <Link to="#" onClick={() => getJobs(1)}><i className="fas fa-angle-double-left"></i></Link>
                                            {page !== 1 ? <Link to="#" onClick={() => getJobs(page - 1)}>{page - 1}</Link> : ""}
                                            <Link to="#" className="active">{page}</Link>
                                            {page + 1 <= lastPage ? <Link to="#" onClick={() => getJobs(page + 1)}>{page + 1}</Link> : ""}
                                            <Link to="#" onClick={() => getJobs(lastPage)}><i className="fas fa-angle-double-right"></i></Link>
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