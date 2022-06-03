import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';



// import { servDeleteUser } from '../../../services/servDeleteUser';
import api from '../../../config/configApi';

import Moment from 'moment';

export const ViewJob = (props) => {

    const { state } = useLocation();

    const [data, setData] = useState('');
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    useEffect(() => {
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

        getJob();
    }, [id]);

    // const deleteUser = async (idUser) => {
    //     const response = await servDeleteUser(idUser);

    //     if (response) {
    //         if (response.type === "success") {
    //             setStatus({
    //                 type: "redSuccess",
    //                 mensagem: response.mensagem
    //             });
    //         } else {
    //             setStatus({
    //                 type: response.type,
    //                 mensagem: response.mensagem
    //             });
    //         }
    //     } else {
    //         setStatus({
    //             type: "redError",
    //             mensagem: "Erro: Tente mais tarde!"
    //         });
    //     }
    // }

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="dashboard-company" />

                <div className="wrapper">
                    <div className="row">

                        {/* <div className="top-content-adm">
                            <span className="title-content">Visualizar Vaga</span>

                        </div> */}

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

                        <div className="card">
                            <h5 className="card-header">{data.title}</h5>
                            <div className="card-body"> 
                                <h5 className="card-title">{data.description}</h5>
                                <p className="card-text"><strong>Empresa:</strong> {data.company} </p>
                                <p className="card-text"><strong>Cidade: </strong> {data.city}  <strong> - UF: </strong>  {data.uf}</p>
                                <p className="card-text"><strong>Tipo de contratação:</strong>  {data.hiring_type} <strong> - Período: </strong>  {data.hiring_period} -<strong>  Data Limite:</strong>  {Moment(data.deadline).format('DD/MM/YYYY')}</p>
                             
                                <div className="top-content-adm-right">
                                <Link to={"/add-skill/" + data.id}>
                                    <button type="button" className="btn-primary">Critérios</button>
                                </Link>{" "}
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
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}