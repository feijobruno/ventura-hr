import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';

import api from '../../../config/configApi';

export const Candidatures = () => {

    const { state } = useLocation();

    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const [lastPage, setLastPage] = useState("");

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : "",
        id_job: state ? state.id_job : ""
    });

    const getCandidatures = async (page) => {

        if (page === undefined) {
            page = 1;
        }
        setPage(page);

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.get("/candidates/candidatures/" + page, headers)
            .then((response) => {
                setData(response.data.candidatures);
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
        getCandidatures();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="candidatures" />
                <div className="wrapper">
                    <div className="row">
                        <div className="content-adm">
                            <div className="card text-center">
                                <div className="card-header">
                                    Processos seletivos
                                </div>
                                {data.length != 0 ?
                                    <div className="card-body">
                                        <table className="table table-bordered table-sm text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Cargo</th>
                                                    <th scope="col">Descrição</th>
                                                    <th scope="col">Empresa</th>
                                                    <th scope="col">Cidade</th>
                                                    <th scope="col">Recrutado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map(candidature => (
                                                    <tr key={candidature.id_job}>
                                                        <td>{candidature.id_job}</td>
                                                        <td>{candidature.title}</td>
                                                        <td>{candidature.description}</td>
                                                        <td>{candidature.company}</td>
                                                        <td>{candidature.city} / {candidature.uf}</td>
                                                        <td>{candidature.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="content-pagination">
                                            <div className="pagination">
                                                <Link to="#" onClick={() => getCandidatures(1)}><i className="fas fa-angle-double-left"></i></Link>
                                                {page !== 1 ? <Link to="#" onClick={() => getCandidatures(page - 1)}>{page - 1}</Link> : ""}
                                                <Link to="#" className="active">{page}</Link>
                                                {page + 1 <= lastPage ? <Link to="#" onClick={() => getCandidatures(page + 1)}>{page + 1}</Link> : ""}
                                                <Link to="#" onClick={() => getCandidatures(lastPage)}><i className="fas fa-angle-double-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    : <div className="row mt-0 justify-content-center text-center">
                                    <div className="alert alert-danger alert-dismissible fade show col-md-6" role="alert">Nenhum processo seletivo em andamento.
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                                    
                                    }
                            </div>
                        </div >
                    </div >
                </div >
            </div >
        </div >
    );
}