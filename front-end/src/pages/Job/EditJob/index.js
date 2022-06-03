import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';

export const EditJob = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [hiring_type, setHiringType] = useState('');
    const [deadline, setDeadLine] = useState('');
    const [hiring_period, setHiringPeriod] = useState('');
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editJob = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/job/job", { id, title, description }, headers)
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
                        mensagem: 'Erro: Tente mais tarde!'
                    });
                }
            });
    }

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
                        setTitle(response.data.job.title);
                        setDescription(response.data.job.description);
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Vaga não encontrada!"
                        });
                    }

                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'redWarning',
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Tente mais tarde!"
                        });
                    }
                })
        }

        getJob();
    }, [id]);

    async function validate() {
        let schema = yup.object().shape({
            description: yup.string("Erro: Necessário preencher o campo descrição!")
                .required("Erro: Necessário preencher o campo descrição!"),
            title: yup.string("Erro: Necessário preencher o campo cargo!")
                .required("Erro: Necessário preencher o campo cargo!")
        });

        try {
            await schema.validate({ title, description });
            return true;
        } catch (err) {
            setStatus({ type: 'error', mensagem: err.errors });
            return false;
        }
    }

    // const deleteJob = async (idJob) => {
    //     const response = await servDeleteUser(idJob);
    //     if (response) {
    //         if (response.type === "success") {
    //             setStatus({
    //                 type: 'redSuccess',
    //                 mensagem: response.mensagem
    //             });
    //         } else {
    //             setStatus({
    //                 type: "error",
    //                 mensagem: response.mensagem
    //             });
    //         }
    //     } else {
    //         setStatus({
    //             type: 'error',
    //             mensagem: 'Erro: Tente mais tarde!'
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
                            <span className="title-content">Editar Vaga</span>
                            <div className="top-content-adm-right">
                                <Link to="/jobs">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>{" "}
                                <Link to={"/view-job/" + id}>
                                    <button type="button" className="btn-primary">Visualizar</button>
                                </Link>{" "}
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ?
                                <Redirect to={{
                                    pathname: '/jobs',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/jobs',
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} /> : ""}
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={editJob} className="form-adm">
                                {/* <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Cargo</label>
                                        <input type="text" name="title" id="title" className="input-adm" placeholder="Cargo" value={title} onChange={text => setTitle(text.target.value)} />
                                    </div>
                                </div>
                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="description" id="description" className="input-adm" placeholder="Descrição" value={description} onChange={text => setDescription(text.target.value)} />
                                    </div>
                                </div>
                                <button type="submit" className="btn-warning">Salvar</button> */}

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Cargo</label>
                                        <input type="text" name="title" id="title" className="input-adm" placeholder="Cargo" value={title} onChange={text => setTitle(text.target.value)}/>
                                    </div>
                                    
                                <div className="column">
                                    <label className="title-input">Descrição</label>
                                    <input type="text" name="description" id="description" className="input-adm" placeholder="Descrição" value={description} onChange={text => setDescription(text.target.value)}/>
                                </div>
                                <div className="column">
                                    <label className="title-input">Empresa</label>
                                    <input type="text" name="company" id="company" className="input-adm" placeholder="Empresa" value={company} onChange={text => setCompany(text.target.value)}/>
                                </div>
                                </div>
                                <div className="row-input">
                                <div className="column">
                                    <label className="title-input">Cidade</label>
                                    <input type="text" name="city" id="city" className="input-adm" placeholder="Cidade" value={city} onChange={text => setCity(text.target.value)} />
                                </div>
                                
                                <div className="column">
                                    <label className="title-input">Estado</label><br/>
                                    <select name="uf" id="uf" className="input-select" onChange={text => setUf(text.target.value)}>
                                        <option value={uf}>{uf}</option>
                                        {/* <option value="AC">Acre</option>
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
                                        <option value="TO">Tocantins</option> */}
                                    </select>
                                 </div>

                                 <div className="column">
                                    <label className="title-input">Forma de contratação</label><br/>
                                    <select name="hiring_type" className="input-select" value={hiring_type} onChange={text => setHiringType(text.target.value)}>
                                        <option value="CLT" selected>CLT</option>
                                        <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                                        <option value="Autônomo">Autônomo</option>
                                    </select>
                                 </div>

                                <div className="column">
                                    <label className="title-input">Período de contratação</label>
                                    <input type="text" name="hiring_period" id="hiring_period" className="input-adm" placeholder="Período de contratação" value={hiring_period} onChange={text => setHiringPeriod(text.target.value)} />
                                </div>
  
                                <div className="column">
                                    <label className="title-input">Data Limite</label>
                                    <input type="date" name="deadline" id="deadline" className="input-adm" placeholder="Data Limite" autoComplete="on" value={deadline} onChange={text => setDeadLine(text.target.value)} />
                                </div>

                                </div>
                                
                                <div className="row-input">
                                    <div className="column"></div>
                                    <div className="column">
                                        <button type="submit" className="btn-success">Salvar</button>
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
    )
}