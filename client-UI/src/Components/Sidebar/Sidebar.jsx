/* eslint-disable jsx-a11y/no-static-element-interactions */
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
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
                <Link to="/enterprise" style={{ textDecoration: 'none' }}>
                    <h3 className="text_none">VOU ENTERPRISE</h3>
                </Link>
            </div>

            <div className="links">
                <ul>
                    <p className="spann">Main</p>
                    <Link to="/enterprise" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </Link>

                    <p className="spann">lists</p>
                    <Link to="#" style={{ textDecoration: 'none' }}>
                        <li>
                            <PriceChangeIcon className="icon" /> Voucher
                        </li>
                    </Link>

                    <Link to="/enterprise/events" style={{ textDecoration: 'none' }}>
                        <li>
                            <EventAvailableIcon className="icon" /> Events
                        </li>
                    </Link>


                    <Link to="/enterprise/profile" style={{ textDecoration: 'none' }}>
                        <li>
                            <AccountCircleIcon className="icon" /> Profile
                        </li>
                    </Link>
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
