import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';

export const JobAdd = () => {

    const [job, setJob] = useState({
        title: '',
        description: '',
        deadline: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setJob({ ...job, [e.target.name]: e.target.value });

    const addJob = async e => {
        e.preventDefault();
        if (!(await validate())) return;
        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        await api.post('/jobs/', job, headers)
            .then((response) => {
                setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem,
                    id_job: response.data.id_job
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
            deadline: yup.string("Erro: Necessário preencher o campo data limite!")
                .required("Erro: Necessário preencher o campo data limite!"),
            // deadline: yup.date().max((new Date().toLocaleDateString() + 30  )).required(""),
            description: yup.string("Erro: Necessário preencher o campo descrição!")
                .required("Erro: Necessário preencher o campo descrição"),
            title: yup.string("Erro: Necessário preencher o campo cargo!")
                .required("Erro: Necessário preencher o campo cargo!")
        });

        try {
            await schema.validate({
                title: job.title,
                description: job.description,
                deadline: job.deadline,
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
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="company-dashboard" />
                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Publicar Vaga</span>
                            <div className="top-content-adm-right">
                                <Link to="/dashboard-company">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>
                            </div>
                        </div>
                        <div className="alert-content-adm">
                            {status.type === 'error' ?
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {status.mensagem}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div> : ""}
                            {status.type === 'success' ?
                                <Redirect to={{
                                    pathname: '/skill-add/' + status.id_job,
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} />
                                : ""}
                        </div>
                        <div className="content-adm">
                            <form onSubmit={addJob} className="form-adm">
                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Cargo</label>
                                        <input type="text" name="title" id="title" className="input-adm" placeholder="Cargo" onChange={valueInput} required />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="description" id="description" className="input-adm" placeholder="Descrição" onChange={valueInput} required />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Empresa</label>
                                        <input type="text" name="company" id="company" className="input-adm" placeholder="Empresa" onChange={valueInput} required />
                                    </div>
                                </div>
                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Cidade</label>
                                        <input type="text" name="city" id="city" className="input-adm" placeholder="Cidade" onChange={valueInput} required />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Estado</label><br />
                                        <select name="uf" id="uf" className="input-select" onChange={valueInput}>
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                        </select>
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Forma de contratação</label><br />
                                        <select name="hiring_type" id="hiring_type" className="input-select" onChange={valueInput}>
                                            <option value="CLT">CLT</option>
                                            <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                                            <option value="Autônomo">Autônomo</option>
                                        </select>
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Período de contratação</label>
                                        <input type="text" name="hiring_period" id="hiring_period" className="input-adm" placeholder="Período de contratação" autoComplete="on" onChange={valueInput} />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Data Limite</label>
                                        <input type="date" name="deadline" id="deadline" className="input-adm" placeholder="Data Limite" autoComplete="on" onChange={valueInput} />
                                    </div>
                                </div>
                                <div className="row-input">
                                    <div className="column"></div>
                                    <div className="column">
                                        <button type="submit" className="btn-success">Cadastrar Critérios</button>
                                        <Link to="/jobs">
                                            <button type="button" className="btn-danger ml-2">Cancelar</button>
                                        </Link>
                                    </div>
                                    <div className="column"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};