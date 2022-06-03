import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {

    return (
        <div>                
        <style>
        {`.logo{
            padding: 10px;
            margin-right: 300px;
        }
        .btn-success{
            margin-left: 30px;
        }        
        `}
    </style>
            <div>
                <nav className="navbar">
                <div className="navbar-content">
                        <img src="/logo.png" alt="ventura" className="logo" />
                        <Link to="/login">
                            <button type="submit" className="btn-success">Entrar</button>
                        </Link>
                        <Link to="/add-user-login">
                            <button type="submit" className="btn-success">Cadastra-se gratuitamente</button>
                        </Link>
                    </div>   
                </nav>
            </div>

            <section className="img-top top">
                <style>
                    {`.img-top{
                       
                        background-repeat: no-repeat;
                        background-position: center;
                    }`}
                </style>
                <div className="max-width">
                    <div className="top-content">
                        <div className="text-1"></div>
                        <div className="text-2"></div>
                        <div className="text-3"></div>
                        <a> </a>
                    </div>
                </div>
            </section>

            <section className="services">
                <div className="max-width">
                    <h2 className="title"></h2>
                    <div className="serv-content">
                        <div className="card">
                            <div className="box">
                                <i></i>
                                <div className="text"></div>
                                <p></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="box">
                                <i></i>
                                <div className="text"></div>
                                <p></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="box">
                                <i></i>
                                <div className="text"></div>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="premium">
                <div className="max-width">
                    <h2 className="title"></h2>
                    <div className="premium-content">
                        <div className="column left">
                            <img alt="Serviço premium" />
                        </div>
                        <div className="column right">
                            <div className="text">
                                {/* {data.dataHome.subtitle_ser_prem} */}
                            </div>
                            <p> </p>
                            <a></a>
                        </div>
                    </div>
                </div>
            </section>

            <div>
                <footer>
                    <span>Teste <a></a></span>
                </footer>
            </div>

            {/* <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" strategy="beforeInteractive" />

            <Script src="custom.js" strategy="afterInteractive" /> */}
        </div>
    );
}