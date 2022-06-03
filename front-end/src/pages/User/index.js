import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { servDeleteUser } from '../../services/servDeleteUser';

import useDropdownList from '../../hooks/useDropdownList';

import api from '../../config/configApi';

export const Users = () => {

    const { actionDropdown, closeDropdownAction } = useDropdownList();

    const { state } = useLocation();

    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const [lastPage, setLastPage] = useState("");

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const getUsers = async (page) => {

        if (page === undefined) {
            page = 1;
        }
        setPage(page);

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.get("/user/users/" + page, headers)
            .then((response) => {
                setData(response.data.users);
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
        getUsers();
    }, []);

    // const deleteUser = async (idUser) => {
    //     const response = await servDeleteUser(idUser);

    //     if (response) {
    //         setStatus({ type: response.type, mensagem: response.mensagem });
    //         getUsers();
    //     } else {
    //         setStatus({
    //             type: "error",
    //             mensagem: "Erro: Tente mais tarde!"
    //         });
    //     }
    // }

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="users" />

                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Listar Usuários</span>
                            <div className="top-content-adm-right">
                                <Link to="/add-user">
                                    <button type="button" className="btn-success">Cadastrar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                        </div>

                        <table className="table table-bordered table-sm m-3 text-center">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map(user => (
                                    <tr key={user.id}>
                                        <td scope="row">{user.id}</td>
                                        <td scope="row">{user.name}</td>
                                        <td scope="row">{user.email}</td>
                                        <td scope="row">
                                            <div className="dropdown-action">
                                                <button onClick={() => { closeDropdownAction(); actionDropdown(user.id) }} className="dropdown-btn-action">Ações</button>
                                                <div id={"actionDropdown" + user.id} className="dropdown-action-item">
                                                    <Link to={"/view-user/" + user.id}>Visualizar</Link>
                                                    <Link to={"/edit-user/" + user.id}>Editar</Link>
                                                    {/* <Link to={"#"} onClick={() => deleteUser(user.id)}>Apagar</Link> */}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="content-pagination">
                            <div className="pagination">
                                <Link to="#" onClick={() => getUsers(1)}><i className="fas fa-angle-double-left"></i></Link>

                                {page !== 1 ? <Link to="#" onClick={() => getUsers(page - 1)}>{page - 1}</Link> : ""}

                                <Link to="#" className="active">{page}</Link>

                                {page + 1 <= lastPage ? <Link to="#" onClick={() => getUsers(page + 1)}>{page + 1}</Link> : ""}

                                <Link to="#" onClick={() => getUsers(lastPage)}><i className="fas fa-angle-double-right"></i></Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}