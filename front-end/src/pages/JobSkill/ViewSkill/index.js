import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';


// import { servDeleteUser } from '../../../services/servDeleteUser';
import api from '../../../config/configApi';

export const ViewSkill = (props) => {


    const { state } = useLocation();

    const [data, setData] = useState('');
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    useEffect(() => {
        const getSkill = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/job_skill/job_skill/" + id, headers)
                .then((response) => {
                    if (response.data.skill) {
                        setData(response.data.skill);
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

        getSkill();
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
                <Sidebar active="jobs" />
                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Critérios</span>
                            <div className="top-content-adm-right">
                                <Link to="/add-skill">
                                    <button type="button" className="btn-success">Cadastrar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                        </div>
                        <table className="table-list">
                            <thead className="list-head">
                                <tr>
                                    <th className="list-head-content">Nome</th>
                                    <th className="list-head-content table">Descrição</th>
                                    <th className="list-head-content table">Perfil</th>
                                    <th className="list-head-content table">Peso</th>
                                    <th className="list-head-content">Ações</th>
                                </tr>
                            </thead>

                            <tbody className="list-body">
                                {data.map(skill => (
                                    <tr key={skill.id}>
                                        <td className="list-body-content">{skill.skill}</td>
                                        <td className="list-body-content">{skill.description}</td>
                                        <td className="list-body-content">{skill.company}</td>
                                        <td className="list-body-content">{skill.city}</td>
                                        <td className="list-body-content">{skill.uf}</td>
                                        <td className="list-body-content">Editar</td>
                                        <td className="list-body-content">Excluir</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="content-pagination">
                            <div className="pagination">
                                <Link to="#" onClick={() => getSkill(1)}><i className="fas fa-angle-double-left"></i></Link>

                                {page !== 1 ? <Link to="#" onClick={() => getSkill(page - 1)}>{page - 1}</Link> : ""}

                                <Link to="#" className="active">{page}</Link>

                                {page + 1 <= lastPage ? <Link to="#" onClick={() => getSkill(page + 1)}>{page + 1}</Link> : ""}

                                <Link to="#" onClick={() => getSkill(lastPage)}><i className="fas fa-angle-double-right"></i></Link>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}