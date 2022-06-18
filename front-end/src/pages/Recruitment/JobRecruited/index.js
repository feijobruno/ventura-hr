import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';

import Moment from 'moment';

export const JobsRecruited = (props) => {

    const { state } = useLocation();
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const getJobs = async () => {

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }
        await api.get("/recruitments/candidates", headers)
            .then((response) => {
                if (response) {
                    setData(response.data.jobsRecruited);
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
                <Sidebar active="jobs-recruted" />

                <div className="wrapper">
                    <div className="row">

                        <div className="top-content-adm">
                            {/* <span className="title-content"></span> */}
                            <div className="top-content-adm-right">
                                <Link to="/dashboard-candidate">
                                    <button type="button" className="btn-info">Voltar</button>
                                </Link>
                            </div>
                        </div>
                        <div className="content-adm">
                            <div className="card">
                                <div className="card-header">
                                    Processos seletivos
                                </div>
                                { (data.length != 0) ?
                                    <div className="card-body">
                                        <table className="table table-bordered table-sm text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Vaga</th>
                                                    <th scope="col">Empresa</th>
                                                    <th scope="col">Cargo</th>
                                                    <th scope="col">Recrutado em</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map(recruitment => (
                                                    <tr key={recruitment.id_job}>
                                                        <td>{recruitment.id_job}</td>
                                                        <td>{recruitment.company}</td>
                                                        <td>{recruitment.occupation}</td>
                                                        <td>{Moment(recruitment.createdAt.deadline).format('DD/MM/YYYY')}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    : <div className="row mt-0 justify-content-center text-center">
                                        <div className="alert alert-danger alert-dismissible fade show col-md-4" role="alert">Nenhuma vaga recrutada.
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}