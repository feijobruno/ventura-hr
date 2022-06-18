import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';

export const Navbar = () => {

    const [image] = useState(localStorage.getItem('image'));
    const [name] = useState(localStorage.getItem('name'));
    const barsSidebar = async () => {
        document.getElementById("barsSidebar").classList.toggle("sidebar-active");
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="bars" onClick={() => barsSidebar()}>
                    <i className="fas fa-bars"></i>
                </div>
                <img src="/logo.png" alt="ventura" className="logo" />
            </div>
            <div className="navbar-content">
                <small>{name}</small>
                <div className="avatar ml-3">
                    {/* <span onClick={() => dropdownUserNavbar()} className="drop-nav-bar-user"> */}
                    <span className="drop-nav-bar-user">
                        <img src={image} alt={name} />
                    </span>
                    {/* <div id="dropNavbarUser" className="dropdown-menu setting">
                        <div className="item">
                            <Link to="/view-profile">
                                <span className="fas fa-user"></span> Perfil
                            </Link>
                        </div>
                        <div className="item" onClick={handleLogout}>
                            <span className="fas fa-sign-out-alt"></span> Sair
                        </div>
                    </div> */}
                </div>
            </div>
        </nav>
    )
}