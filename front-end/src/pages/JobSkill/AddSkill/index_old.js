import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';



// import { servDeleteUser } from '../../../services/servDeleteUser';
import api from '../../../config/configApi';

import Moment from 'moment';

export const AddSkill = (props) => {

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
                <Sidebar active="jobs" />
                <div class="container-fluid">

<h1 className="h3 mb-2 text-gray-800">Charts</h1>
<p className="mb-4">Chart.js is a third party plugin that is used to generate the charts in this theme.
    The charts below have been customized - for further customization options, please visit the <a
        target="_blank" href="https://www.chartjs.org/docs/latest/">official Chart.js
        documentation</a>.</p>

<div className="row">

    <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
            </div>
            <div className="card-body">
                <div class="chart-area">
                    <canvas id="myAreaChart"></canvas>
                </div>
                <hr />
                Styling for the area chart can be found in the
            </div>
        </div>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Bar Chart</h6>
            </div>
            <div className="card-body">
                <div className="chart-bar">
                    <canvas id="myBarChart"></canvas>
                </div>

            </div>
        </div>

    </div>

    <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">

            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Donut Chart</h6>
            </div>
 
            <div className="card-body">
                <div class="chart-pie pt-4">
                    <canvas id="myPieChart"></canvas>
                </div>
                <hr />
                Styling for the donut chart can be found in the

            </div>
        </div>
    </div>
</div>

</div>

</div>

            </div>
    )
}