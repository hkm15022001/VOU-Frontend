import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HandshakeIcon from '@mui/icons-material/Handshake';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import React from 'react';
import { Link } from 'react-router-dom';
import './itemlists.scss';

function ItemLists({ type }) {
    let data;

    // Dynamicaly change the ui content
    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                count: 232,
                icon: (
                    <PermIdentityIcon
                        style={{
                            color: '#FF74B1',
                            backgroundColor: '#FFD6EC',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all users',
                linkto: '/users',
                percent: "20%"
            };
            break;
        case 'events':
            data = {
                title: 'EVENTS',
                isMoney: false,
                count: 34,

                icon: (
                    <EventAvailableIcon
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#FFF38C',
                        }}
                        className="icon"
                    />
                ),
                link: 'View all events',
                linkto: '/events',
                percent: "24%"

            };
            break;
        case 'games':
            data = {
                title: 'GAMES',
                isMoney: true,
                count: 107,
                icon: (
                    <SportsEsportsIcon
                        style={{
                            color: '#367E18',
                            backgroundColor: '#A7FFE4',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all games',
                linkto: '/games',
                percent: "0%"

            };
            break;
        case 'balance':
            data = {
                title: 'Enterprise',
                count: 444,
                isMoney: true,
                icon: (
                    <HandshakeIcon
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#B1B2FF',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all details',
                linkto: '/',
                percent: "10%"

            };
            break;
        default:
            break;
    }

    return (
        <div className="item_listss">
            <div className="name">
                <p>{data.title}</p>
                <span className="persentage positive">
                    <KeyboardArrowUpIcon />
                    {data.percent}
                </span>
            </div>

            <div className="counts">
                {data.count}
            </div>

            <div className="see_item">
                <Link to={data.linkto}>
                    <p>{data.link}</p>
                </Link>
                {data.icon}
            </div>
        </div>
    );
}

export default ItemLists;
