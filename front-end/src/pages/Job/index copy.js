import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

import useDropdownList from '../../hooks/useDropdownList';

import api from '../../config/configApi';

import Moment from 'moment';

export const Jobs = () => {

    const { actionDropdown, closeDropdownAction } = useDropdownList();

    const { state } = useLocation();

    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const [lastPage, setLastPage] = useState("");

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : "",
        id_job: state ? state.id_job: ""
    });

    const getJobs = async (page) => {

        if (page === undefined) {
            page = 1;
        }
        setPage(page);

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.get("/job/jobs/" + page, headers)
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

    useEffect(() => {
        getJobs();
    }, []);


    

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="jobs" />

                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Consulta de Vagas Disponíveis</span>
                            <div className="top-content-adm-right">
                                <Link to="/add-job">
                                    <button type="button" className="btn-success">Cadastrar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                        </div>
                        <p>{status.id_job}</p>
                        <table className="table-list">
                            <thead className="list-head">
                                <tr>
                                    <th className="list-head-content">ID</th>
                                    <th className="list-head-content">Cargo</th>
                                    <th className="list-head-content table">Empresa</th>
                                    <th className="list-head-content table">Cidade</th>
                                    <th className="list-head-content table">Estado</th>
                                    <th className="list-head-content table">Data Limite</th>
                                    <th className="list-head-content">Ações</th>
                                </tr>
                            </thead>

                            <tbody className="list-body">
                                {data.map(job => (
                                    <tr key={job.id}>
                                        <td className="list-body-content">{job.id}</td>
                                        <td className="list-body-content">{job.title}</td>
                                        <td className="list-body-content">{job.company}</td>
                                        <td className="list-body-content">{job.city}</td>
                                        <td className="list-body-content">{job.uf}</td>
                                        <td className="list-body-content"> {Moment(job.deadline).format('DD/MM/YYYY')}</td>
                                        <td className="list-body-content">
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
    );
}