/* eslint-disable jsx-a11y/no-static-element-interactions */
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ColorContext } from '../../ColorContext/darkContext';
import './Sidebar.scss';

function handleLogout() {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
}
function Sidebar() {
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);

    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h3 className="text_none">VOU ADMIN</h3>
                </Link>
            </div>

            <div className="links">
                <ul>
                    <p className="spann">Main</p>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </Link>

                    <p className="spann">lists</p>
                    <Link to="/users" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonIcon className="icon" /> Users
                        </li>
                    </Link>

                    <Link to="/games" style={{ textDecoration: 'none' }}>
                        <li>
                            <SportsEsportsIcon className="icon" /> Games
                        </li>
                    </Link>
                    <Link to="/events" style={{ textDecoration: 'none' }}>
                        <li>
                            <EventAvailableIcon className="icon" /> Events
                        </li>
                    </Link>
                    <Link to="/enterprise" style={{ textDecoration: 'none' }}>
                        <li>
                            <HandshakeIcon className="icon" /> Enterprise
                        </li>
                    </Link>
                    <li>
                        <BarChartIcon className="icon" /> Status
                    </li>

                    <p className="spann">Seetings</p>
                    <li>
                        <AccountCircleIcon className="icon" /> Profile
                    </li>
                    <li>
                        <SettingsRoundedIcon className="icon" /> Setting
                    </li>
                    <Button className="logout" color="inherit" variant="outlined" onClick={handleLogout}>
                        <li>
                            <LogoutIcon className="icon" /> Log Out
                        </li>
                    </Button>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
