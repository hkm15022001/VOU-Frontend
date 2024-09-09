import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { React, useEffect, useState } from 'react';
import { getCountAllEnterprises, getCountAllGames, getCountAllUsers, getStatisticEnterprises, getStatisticUsers } from '../../api';
import Chart from '../Chart/Chart';
import ItemLists from '../ItemLists/ItemLists';
import Navbar from '../Navbar/Navbar';
import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../Sidebar/Sidebar';
import TableList from '../TransactionList/TransactionList';
import './Home.scss';

// import dummy image
import book1 from '/Images/book1.jpg';
import book2 from '/Images/book2.jpg';
import book3 from '/Images/book3.jpg';
import book4 from '/Images/book4.jpg';
import book5 from '/Images/book5.jpg';

function Home() {
    const data = [
        {
            _id: 23423343,
            game: 'Cầu nguyện cùng sao băng',
            image: book1,
            customer: 'DUONGHDT',
            date: '3 October, 2024',
            score: "Mảnh ghép 1",
            enterprise: 'Shopee',
            status: 'Approved',
        },
        {
            _id: 235343343,
            game: 'Cầu nguyện cùng sao băng',
            image: book2,
            customer: 'Hungdq30',
            date: '23 April, 2024',
            score: "Mảnh ghép 2",
            enterprise: 'Grab',
            status: 'Pending',
        },
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
            _id: 23423143,
            game: 'Cầu nguyện cùng sao băng',
            image: book4,
            customer: 'Minh',
            date: '3 March, 2024',
            score: "Mảnh ghép 5",
            enterprise: 'Garena',
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
    const [countUsers, setCountUsers] = useState(null);
    const [countGames, setCountGames] = useState(null);
    const [countEnterprises, setCountEnterprises] = useState(null);
    const [usersInWeekData, setUsersInWeekData] = useState([]);
    const [enterpriseInWeekData, setEnterpriseInWeekData] = useState([]);

    const [loading,setLoading] = useState(true);
    const transform = (data) => {
        return  data.map(item => ({
            ...item,
            day: item.day.split('T')[0] 
        }));
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [response1, response2, response3, response4, response5] = await Promise.all([
                    getCountAllUsers(),
                    getCountAllGames(),
                    getCountAllEnterprises(),
                    getStatisticUsers(),
                    getStatisticEnterprises()
                ]);
                setCountUsers(response1.data.data);
                setCountGames(response2.data.data);
                setCountEnterprises(response3.data.data);
                
                setUsersInWeekData(transform(response4.data.data));
                setEnterpriseInWeekData(transform(response5.data.data));

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    return (
        <div className="home">
            <div className="home_sidebar">
                <Sidebar />
            </div>
    
            <div className="home_main">
                <Navbar />
    
                <div className="bg_color" />
                {loading ? (
                    <div className="home_items">
                        <ItemLists type="user" count={"Loading..."} />
                        <ItemLists type="games" count={"Loading..."} />
                        <ItemLists type="events" count={"Loading..."} />
                        <ItemLists type="enterprise" count={"Loading..."} />
                    </div>
                ) : (
                    <div className="home_items">
                        <ItemLists type="user" count={countUsers} />
                        <ItemLists type="games" count={countGames} />
                        <ItemLists type="events" count={4} />
                        <ItemLists type="enterprise" count={countEnterprises} />
                    </div>
                )}
    
                <div className="chart_sec">
                    <div className="progress">
                        <ProgressBar />
                    </div>
                    <div className="charts">
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Chart marginBottom={150} data={usersInWeekData} height={450} title="Total registered users" />
                                <Chart marginBottom={20} data={enterpriseInWeekData} height={450} title="Total registered enterprise" />
                            </>
                        )}
                    </div>
                </div>
    
                <div className="table">
                    <div className="title">Latest Transactions</div>
                    <TableList data={data}/>
                </div>
            </div>
        </div>
    );
}

export default Home;
