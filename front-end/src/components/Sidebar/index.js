import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';

export const Sidebar = (props) => {

    const { handleLogout, accountType } = useContext(Context);

    return (
        <div id="barsSidebar" className="sidebar">
            
            { accountType === "candidate" ? <Link to="/dashboard-candidate" className={props.active === "dashboard" ? "sidebar-nav active" : "sidebar-nav"} ><i className="icon fa fa-tachometer-alt"></i><span> Dashboard</span></Link> : ""}
            { accountType === "company" ?  <Link to="/dashboard-company" className={props.active === "dashboard" ? "sidebar-nav active" : "sidebar-nav"} ><i className="icon fa fa-tachometer-alt"></i><span> Dashboard</span></Link> : ""}
            { accountType === "adm" ?  <Link to="/dashboard-adm" className={props.active === "dashboard" ? "sidebar-nav active" : "sidebar-nav"} ><i className="icon fa fa-tachometer-alt"></i><span> Dashboard</span></Link> : ""}
            
            <Link to="/view-profile" className={props.active === "profile" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-user"></i><span>Perfil</span></Link>
            { accountType === "adm" ? <Link to="/users" className={props.active === "users" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-users"></i><span>Usuários</span></Link> : ""}
            { accountType === "candidate" ? <Link to="/candidatures" className={props.active === "candidatures" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fa fa-id-badge"></i><span>Procesos seletivos</span></Link> : ""}

            { accountType === "candidate" ? 
            <Link to="/candidate-jobs-search" className={props.active === "jobs" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fa fa-building"></i><span>Vagas Disponíveis</span></Link> : ""}
            { accountType === "company" ? <Link to="/jobs-search" className={props.active === "jobs" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fa fa-building"></i><span>Vagas</span></Link>: ""}
            { accountType === "company" ? <Link to="/jobs-reply" className={props.active === "jobs-reply" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fa fa-id-card"></i><span>Recrutar</span></Link>: ""}

            <Link to="/" onClick={handleLogout} className="sidebar-nav"><i className="icon fas fa-sign-out-alt"></i><span>Sair</span></Link>
        </div>
    )
}