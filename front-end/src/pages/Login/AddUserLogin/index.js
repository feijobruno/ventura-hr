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
                        <span>Cadastrar Usuário</span>
                    </div>

                    {status.type === 'redSuccess' ?
                        <Redirect to={{
                            pathname: '/',
                            state: {
                                type: "success",
                                mensagem: status.mensagem
                            }
                        }} />
                        : ""}

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
                        </div>
                        <div className="row-input">
                            <div className="column">
                                <label className="title-input">E-mail</label>
                                <input type="email" name="email" id="email" className="input-adm" placeholder="Melhor e-mail" onChange={valueInput} />
                            </div>
                            <div className="column">
                                <label className="title-input">Senha</label>
                                <input type="password" name="password" id="password" className="input-adm" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={valueInput} />
                            </div>
                            <div className="column">
                                <label className="title-input">Tipo de Conta</label>
                                <select name="account_type" className="input-select">
                                    <option value="1" selected>Candidato</option>
                                    <option value="2">Empresa</option>
                                </select>
                            </div>
                            <div className="column">
                                <label className="title-input">CPF</label>
                                <input type="text" name="cpf" id="cpf" className="input-adm" placeholder="CPF" autoComplete="on" onChange={valueInput} />
                            </div>

                        </div>
                        <div className="row-input">
                            <div className="column">
                                <label className="title-input">Razão Social</label>
                                <input type="text" name="razao_social" id="razao_social" className="input-adm" placeholder="Razão Social" autoComplete="on" onChange={valueInput} />
                            </div>
                            <div className="column">
                                <label className="title-input">CNPJ</label>
                                <input type="text" name="cnpj" id="cnpj" className="input-adm" placeholder="CNPJ" autoComplete="on" onChange={valueInput} />
                            </div>
                        </div>
                        
                        <button type="submit" className="btn-success">Cadastrar</button>
                                                         
                    <div className="signup-link">
                        <Link to="/" className="link-pg-login">Acessar</Link>
                    </div>

                    </form>

                </div>
            </div>
        </div>
    );
};