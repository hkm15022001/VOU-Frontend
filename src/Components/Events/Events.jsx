import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import TableList from '../TableList/TableList';
import './events.scss';

function Events() {
    return (
        <div className="events">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="events_main">
                <Navbar />

                <TableList />
            </div>
        </div>
    );
}

export default Events;
