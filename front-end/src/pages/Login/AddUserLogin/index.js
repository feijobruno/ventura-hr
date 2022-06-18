import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import api from '../../../config/configApi';

export const AddUserLogin = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const addUser = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        await api.post('/login/add-user-login', user, headers)
            .then((response) => {
                setStatus({
                    type: 'redSuccess',
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

    }

    async function validate() {
        let schema = yup.object().shape({
            password: yup.string("Erro: Necessário preencher o campo senha!")
                .required("Erro: Necessário preencher o campo senha!")
                .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),
            email: yup.string("Erro: Necessário preencher o campo e-mail!")
                .email("Erro: Necessário preencher o campo e-mail!")
                .required("Erro: Necessário preencher o campo e-mail!"),
            name: yup.string("Erro: Necessário preencher o campo nome!")
                .required("Erro: Necessário preencher o campo nome!")
        });

        try {
            await schema.validate({
                name: user.name,
                email: user.email,
                password: user.password,
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

    return (
        <div className="d-flex">
            <div className="container-login-add-user">
                <div className="wrapper-login">
                    <div className="title">
                        <span>Cadastrar Candidato</span>
                    </div>
                    <div className="alert-content-adm">
                        {status.type === 'redSuccess' ?
                            <Redirect to={{
                                pathname: '/',
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} />
                            : ""}

                        {status.type === 'error' ?
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {status.mensagem}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> : ""}
                    </div>

                    <form onSubmit={addUser} className="form-login">

                        <div className="row-input">
                            <div className="column">
                                <label className="title-input">Nome</label>
                                <input type="text" name="name" id="name" className="input-adm" placeholder="Nome completo" onChange={valueInput} />
                            </div>

                            <div className="column">
                                <label className="title-input">Endereco</label>
                                <input type="text" name="address" id="address" className="input-adm" placeholder="Endereço" onChange={valueInput} />
                            </div>
                            <div className="column">
                                <label className="title-input">Telefone</label>
                                <input type="text" name="phone" id="phone" className="input-adm" placeholder="Telefone" onChange={valueInput} />
                            </div>
                            <div className="column">
                                <label className="title-input">CPF</label>
                                <input type="text" name="cpf" id="cpf" className="input-adm" placeholder="CPF" onChange={valueInput} />
                            </div>
                        </div>
                        <div className="row-input">
                            <div className="column">
                                <label className="title-input">E-mail</label>
                                <input type="email" name="email" id="email" className="input-adm" placeholder="Melhor e-mail" onChange={valueInput} />
                            </div>
                            <div className="column">
                                <label className="title-input">Senha</label>
                                <input type="password" name="password" id="password" className="input-adm" placeholder="Senha para acessar o sistema" onChange={valueInput} />
                            </div>
                        </div>
                        <div className="signup-link">
                            <button type="submit" className="btn btn-success">Cadastrar</button>
                            <button type="submit" className="btn btn-primary ml-2"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Voltar</Link></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};