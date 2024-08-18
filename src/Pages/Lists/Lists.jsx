/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import GameDataGrid from '../../Components/GameTable/GameTable';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import TransactionList from '../../Components/TransactionList/TransactionList';
import UserDataGrid from '../../Components/UserTable/UserTable';
import './lists.scss';

function Lists({ type }) {
    //
    return (
        <div className="list_page">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="list_page_main">
                <Navbar />

                {/* mui data table */}
                <div className="data_table">
                    <div className="btnn">
                        <Link
                            to={`/${
                                type === 'games' ? 'games' : 'users' ? 'users' : 'blogs'
                            }/addnew`}
                            style={{ textDecoration: 'none' }}
                        >
                            <button type="button">Add New {type}</button>
                        </Link>
                    </div>

                    {type === 'users' ? <UserDataGrid /> :  'games' ? <GameDataGrid/> : <TransactionList/> }
                    

                </div>
            </div>
        </div>
    );
}

export default Lists;
