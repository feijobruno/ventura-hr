import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import api from '../../../config/configApi';
import Moment from 'moment';

export const JobEdit = (props) => {

    const [id] = useState(props.match.params.id);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [city, setCity] = useState('');
    // const [uf, setUf] = useState('');
    // const [hiring_type, setHiringType] = useState('');
    const [deadline, setDeadLine] = useState('');
    const [hiring_period, setHiringPeriod] = useState('');


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

        await api.put("/jobs/", { id, title, description, company, city, deadline }, headers)
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

    const getJob = async () => {

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.get("/jobs/id/" + id, headers)
            .then((response) => {
                if (response.data.job) {
                    setTitle(response.data.job.title);
                    setDescription(response.data.job.description);
                    setCompany(response.data.job.company);
                    setCity(response.data.job.city);
                    setDeadLine(response.data.job.deadline);
                    setHiringPeriod(response.data.job.hiring_period);
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

    useEffect(() => {
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
                                <Link to={"/job-view/" + id}>
                                    <button type="button" className="btn-primary">Visualizar</button>
                                </Link>{" "}
                            </div>
                        </div>
                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ?
                                <Redirect to={{
                                    pathname: '/job-view/' + id,
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/job-view/' + id,
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} /> : ""}
                            {status.type === 'error' ?
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {status.mensagem}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div> : ""}
                        </div>
                        <div className="content-adm">
                            <form onSubmit={editJob} className="form-adm">
                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Cargo</label>
                                        <input type="text" name="title" id="title" className="input-adm" placeholder="Cargo" value={title} onChange={text => setTitle(text.target.value)} />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="description" id="description" className="input-adm" placeholder="Descrição" value={description} onChange={text => setDescription(text.target.value)} />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Empresa</label>
                                        <input type="text" name="company" id="company" className="input-adm" placeholder="Empresa" value={company} onChange={text => setCompany(text.target.value)} />
                                    </div>
                                </div>
                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Cidade</label>
                                        <input type="text" name="city" id="city" className="input-adm" placeholder="Cidade" value={city} onChange={text => setCity(text.target.value)} />
                                    </div>

                                    <div className="column">
                                        <label className="title-input">Período de contratação</label>
                                        <input type="text" name="hiring_period" id="hiring_period" className="input-adm" placeholder="Período de contratação" value={hiring_period} onChange={text => setHiringPeriod(text.target.value)} />
                                    </div>

                                    <div className="column">
                                        <label className="title-input">Data Limite</label>
                                        <input type="date" name="deadline" id="deadline" className="input-adm" placeholder="Data Limite" autoComplete="on" value={Moment(deadline).format('YYYY-MM-DD')} onChange={text =>

                                            setDeadLine(text.target.value)} />
                                    </div>
                                </div>
                                <div className="row-input">
                                    <div className="column"></div>
                                    <div className="column">
                                        <button type="submit" className="btn-success">Salvar</button>
                                        <Link to={"/job-view/" + id }>
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