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

            <section className="search-banner">
            <div className="max-width">
            {/* <h2 className="title">SÃO MAIS DE 12.000 VAGAS</h2>
            <h1 className="search-banner__title">Encontre sua vaga de emprego</h1> */}
            <form>
                <input id="nova-home-search" className="search-banner__input" placeholder="Digite um cargo, empresa e/ou localização" aria-label="Digite um cargo, empresa e/ou localização" data-testid="input-text_search-desktop" />
                <button type="submit" className="btn-success">Buscar</button>
            </form>
            {/* <img className="search-banner__search-bg" alt="" style="text-align: center" height="442" width="548" src="" /> */}
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

            <div>
                <footer>
                    {/* <span>Teste <a></a></span> */}
                </footer>
            </div>

            {/* <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" strategy="beforeInteractive" />

            <Script src="custom.js" strategy="afterInteractive" /> */}
        </div>
    );
}