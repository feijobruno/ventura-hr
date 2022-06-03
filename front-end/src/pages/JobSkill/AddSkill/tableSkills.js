import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import api from '../../../config/configApi';

export const TableSkills = (props) => {

    const { state } = useLocation();

    const [id] = useState(props.id);
    const [data, setData] = useState([]);


    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });


    const getJobSkills = async (page) => {

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.get("/job_skill/job_skill/" + id + "", headers)
            .then((response) => {
                if (response) {
                    setData(response.data.jobSkill);
                    setLastPage(response.data.lastPage);
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
        getJobSkills();
    }, []);

    return (
        <div>

            <div className="card text-center mt-4">
                <div className="card-header">
                    Critérios cadastrados
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Perfil</th>
                                <th scope="col">Peso</th>
                            </tr>
                        </thead>

                        <tbody>

                            {data.map( job_skill => (
                                <tr key={ job_skill.id}>
                                    <td scope="row">{job_skill.id}</td>
                                    <td scope="row">{job_skill.skill}</td>
                                    <td scope="row">{job_skill.description}</td>
                                    <td scope="row">{job_skill.profile}</td>
                                    <td scope="row">{job_skill.weight}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}