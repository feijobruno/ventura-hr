import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import useDropdownList from '../../../hooks/useDropdownList';

import api from '../../../config/configApi';

import Moment from 'moment';

export const CandidateJobsSearch = () => {

    const { actionDropdown, closeDropdownAction } = useDropdownList();

    const { state } = useLocation();

    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const [lastPage, setLastPage] = useState("");

    const [job, setJob] = useState({
        title: '',
        city: ''
    });

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : "",
        id_job: state ? state.id_job : ""
    });

    const valueInput = e => setJob({ ...job, [e.target.name]: e.target.value });
               
    const getJobs = async (e , page) => {
        e.preventDefault();

        if (page === undefined) {
            page = 1;
        }
        setPage(page);

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.post("/jobs/search/" + page, job, headers)
            .then((response) => {
                setData(response.data.jobs);
                setLastPage(response.data.lastPage);
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

    const getJobsPagination = async (page) => {

        if (page === undefined) {
            page = 1;
        }
        setPage(page);

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.post("/jobs/search/" + page, job, headers)
            .then((response) => {
                setData(response.data.jobs);
                setLastPage(response.data.lastPage);
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
    // useEffect(() => {
    //     getJobs();
    // }, []);
    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="jobs" />
                <div className="wrapper">
                    <div className="row">
                        <div className="content-adm">
                            <div className="card text-center">
                                <div className="card-header">
                                    <small>
                                        Vagas disponíveis
                                    </small>
                                </div>
                                <div className="row justify-content-center mt-1 mb-1">
                                            <form onSubmit={getJobs}>
                                                <div className="form-row justify-content-center">
                                                    <div className="form-group col-md">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></div>
                                                            </div>
                                                            <input type="text" className="form-control" id="title" name="title" placeholder="Digite um cargo" onChange={valueInput} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-md">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                                                            </div>
                                                            <input type="text" className="form-control" id="city" name="city" placeholder="Digite uma cidade" onChange={valueInput} />
                                                        </div>
                                                    </div>
                                                    { }
                                                    <div className="form-group col-md-2">
                                                        <button type="submit" className="btn btn-primary btn-sm">Pesquisar</button>                                          
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                {data.length != 0 ?     
                                <div className="card-body">
                                    <table className="table table-bordered table-sm text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Cargo</th>
                                                <th scope="col">Empresa</th>
                                                <th scope="col">Cidade</th>
                                                <th scope="col">Data Limite</th>
                                                <th scope="col">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map(job => (
                                                <tr key={job.id}>
                                                    <td>{job.id}</td>
                                                    <td>{job.title}</td>
                                                    <td>{job.company}</td>
                                                    <td>{job.city}</td>
                                                    <td> {Moment(job.deadline).format('DD/MM/YYYY')}</td>
                                                    <td className="list-body-content">
                                                        <div className="dropdown-action">
                                                            <button onClick={() => { closeDropdownAction(); actionDropdown(job.id) }} className="dropdown-btn-action">Ações</button>
                                                            <div id={"actionDropdown" + job.id} className="dropdown-action-item">
                                                                <Link to={"/candidate-job-view/" + job.id}>Visualizar</Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="content-pagination">
                                        <div className="pagination">
                                            <Link to="#" onClick={() => getJobsPagination(1)}><i className="fas fa-angle-double-left"></i></Link>
                                            {page !== 1 ? <Link to="#" onClick={() => getJobsPagination(page - 1)}>{page - 1}</Link> : ""}
                                            <Link to="#" className="active">{page}</Link>
                                            {page + 1 <= lastPage ? <Link to="#" onClick={() => getJobsPagination(page + 1)}>{page + 1}</Link> : ""}
                                            <Link to="#" onClick={() => getJobsPagination(lastPage)}><i className="fas fa-angle-double-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                                 : "" }
                            </div>
                        </div >
                    </div >
                </div >
            </div >
        </div >
    );
}