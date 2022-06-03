import React, { useContext } from 'react';
import { Context } from '../../Context/AuthContext';

import { Link } from 'react-router-dom';

export const Sidebar = (props) => {

    const { handleLogout } = useContext(Context);

    return (
        <div id="barsSidebar" className="sidebar">

            <Link to="/dashboard-user" className={props.active === "dashboard-user" ? "sidebar-nav active" : "sidebar-nav"} ><i className="icon fa fa-id-badge"></i><span> Minhas Vagas</span></Link>

            <Link to="/dashboard-company" className={props.active === "dashboard-company" ? "sidebar-nav active" : "sidebar-nav"} ><i className="icon fa fa-building"></i><span> Vagas Cadastradas</span></Link>
            
            <Link to="/view-profile" className={props.active === "profile" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-user"></i><span>Perfil</span></Link>

            <Link to="/users" className={props.active === "users" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-users"></i><span>Usuários</span></Link>

            <Link to="/jobs" className={props.active === "jobs" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fa fa-id-badge"></i><span>Vagas</span></Link>

            <Link to="/job-candidates" className={props.active === "job-candidates" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-user-clock"></i><span>Minhas vagas</span></Link>

            <Link to="#" onClick={handleLogout} className="sidebar-nav"><i className="icon fas fa-sign-out-alt"></i><span>Sair</span></Link>
        </div>
    )
}