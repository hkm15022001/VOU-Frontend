import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../Components/Button/Button';
import Chart from '../../Components/Chart/Chart';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import TableList from '../../Components/TransactionList/TransactionList';
import { BackEndAddress, getEvent, updateEvent, getTotalAttendancesByEventIDInWeek } from '../../api';
import EventDetailsEdit from '../EventEdit/EventEdit';
import './eventDetail.scss';

// import dummy image
import book1 from '/Images/book1.jpg';
import book2 from '/Images/book2.jpg';
import book3 from '/Images/book3.jpg';
import book4 from '/Images/book4.jpg';
import book5 from '/Images/book5.jpg';

// const data = [
//     {
//         day: '03/08/2024',
//         count: 50,
//     },
//     {
//         day: '04/08/2024',
//         count: 75,
//     },
//     {
//         day: '05/08/2024',
//         count: 80,
//     },
//     {
//         day: '06/08/2024',
//         count: 45,
//     },
//     {
//         day: '07/08/2024',
//         count: 66,
//     },
//     {
//         day: '08/08/2024',
//         count: 105,
//     },
//     {
//         day: '08/09/2024',
//         count: 88,
//     },
// ];

const data2 = [
    {
        _id: 234239873,
        game: 'Thử thách trí tuệ',
        image: book3,
        customer: 'minh22',
        date: '10 October, 2024',
        score: 25,
        enterprise: 'Bee',
        status: 'Approved',
    },
    {
        _id: 123423343,
        game: 'Thử thách trí tuệ',
        image: book5,
        customer: 'Duong',
        date: '20 November, 2024',
        score: 45,
        enterprise: 'Viettel Money',
        status: 'Approved',
    },
    {
        _id: 2333343,
        game: 'Thử thách trí tuệ',
        image: book2,
        customer: 'Minh',
        date: '12 June, 2024',
        score: 28,
        enterprise: 'FPT Play',
        status: 'Pending',
    },
];
function EventDetail() {
    // const { userId, productId } = useParams();
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [statistic, setStatistic] = useState([]);
    const navigate = useNavigate();
    const transform = (data) => {
        return  data.map(item => ({
            ...item,
            day: item.day.split('T')[0] 
        }));
    }
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const [eventData, statisticData] = await Promise.all([
                    getEvent(eventId),
                    getTotalAttendancesByEventIDInWeek(eventId)
                ]); ;
                
                setEvent(eventData.data.data);
                setStatistic(transform(statisticData.data.data))
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleSave = async (updatedEvent) => {
        try {
            // console.log(updatedevent)
            await updateEvent(eventId, updatedEvent);
            setEvent(updatedEvent);
            setEditing(false);
            navigate('/enterprise/events'); // Điều hướng về trang danh sách người dùng
        } catch (error) {
            setError(error);
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div className="details">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="detail_page_main">
                <Navbar />

                <div className="event_info">
                    {editing ? (
                        <EventDetailsEdit onSave={handleSave} onCancel={handleCancel} event={{
                            name: event.name,
                            images: event.images,
                            voucher_num: event.voucher_num,
                            start_time: event.start_time,
                            end_time: event.end_time,
                            game_name: event.game_name
                        }} />
                    ) :
                        (<div className="event_detail">
                            <img src={`${BackEndAddress}/image/event/${event.images}`} alt="event" className="event_image" />
                            <div className="event_detailss">
                                <p className="name">{event.name}</p>
                                <p>Number of Vouchers: {event.voucher_num}</p>
                                <p>Start Time: {event.start_time.split('T')[0]}</p>  
                                <p>End Time: {event.end_time.split('T')[0]}</p>
                                <p>Game: {event.game_name}</p>
                            </div>
                            <CustomButton type={"button"} content={"Edit"} onClickHandle={handleEdit}></CustomButton>
                        </div>
                        )}

                    <div className="event_chart">
                        <Chart data={statistic} height={390} title="Number of plays" />
                    </div>
                </div>

                <div className="table">
                    <div className="title">History</div>
                    <TableList data={data2} />
                </div>
            </div>

        </div>
    );
}

export default EventDetail;
