import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { React, useEffect, useState } from 'react';
import { getCountAllEnterprises, getCountAllGames, getCountAllUsers, getStatisticEnterprises, getStatisticUsers } from '../../api';
import Chart from '../Chart/Chart';
import ItemLists from '../ItemLists/ItemLists';
import Navbar from '../Navbar/Navbar';
import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../Sidebar/Sidebar';

import './Home.scss';


function Home() {
    const [countUsers, setCountUsers] = useState(null);
    const [countGames, setCountGames] = useState(null);
    const [countEnterprises, setCountEnterprises] = useState(null);
    // const [usersInWeekData, setUsersInWeekData] = useState([]);
    const [enterpriseInWeekData, setEnterpriseInWeekData] = useState([]);
    const usersInWeekData= [
        {
            day: '14/08/2024',
            count: 50,
        },
        {
            day: '15/08/2024',
            count: 75,
        },
        {
            day: '16/08/2024',
            count: 20,
        },
        {
            day: '17/08/2024',
            count: 65,
        },
        {
            day: '18/08/2024',
            count: 22,
        },
        {
            day: '19/08/2024',
            count: 98,
        },
        {
            day: '20/09/2024',
            count: 88,
        },
    ];
    const [loading, setLoading] = useState(false);  //true
    const transform = (data) => {
        return data.map(item => ({
            ...item,
            day: item.day.split('T')[0]
        }));
    }
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const [response1, response2, response3, response4, response5] = await Promise.all([
    //                 getCountAllUsers(),
    //                 getCountAllGames(),
    //                 getCountAllEnterprises(),
    //                 getStatisticUsers(),
    //                 getStatisticEnterprises()
    //             ]);
    //             setCountUsers(response1.data.data);
    //             setCountGames(response2.data.data);
    //             setCountEnterprises(response3.data.data);

    //             setUsersInWeekData(transform(response4.data.data));
    //             setEnterpriseInWeekData(transform(response5.data.data));

    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

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
                        <ItemLists type="events" count={"Loading..."} />
                        <ItemLists type="number of plays" count={"Loading..."} />
                    </div>
                ) : (
                    <div className="home_items">
                        <ItemLists type="events" count={2} />
                        <ItemLists type="number of plays" count={12} />
                    </div>
                )}

                <div className="chart_sec">
                    <div className="progress">
                        <ProgressBar />
                    </div>
                    <div className="charts">
                        {/* {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Chart marginBottom={150} data={usersInWeekData} height={450} title="Total used vouchers" />
                            </>
                        )} */}
                        <Chart marginBottom={150} data={usersInWeekData} height={450} title="Total used vouchers" />

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
