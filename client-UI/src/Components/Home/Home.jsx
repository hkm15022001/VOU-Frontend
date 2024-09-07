import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { React, useEffect, useState } from 'react';
import { getAttendancesInWeek, getAllEventsForEnterPrise} from '../../api';
import Chart from '../Chart/Chart';
import ItemLists from '../ItemLists/ItemLists';
import Navbar from '../Navbar/Navbar';
import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../Sidebar/Sidebar';

import './Home.scss';


function Home() {
    const [totalAttendancesInWeek, setTotalAttendancesInWeek] = useState([]);
    const [totalEvents, setTotalEvents] = useState(0);


    // const usersInWeekData= [
    //     {
    //         day: '14/08/2024',
    //         count: 50,
    //     },
    //     {
    //         day: '15/08/2024',
    //         count: 75,
    //     },
    //     {
    //         day: '16/08/2024',
    //         count: 20,
    //     },
    //     {
    //         day: '17/08/2024',
    //         count: 65,
    //     },
    //     {
    //         day: '18/08/2024',
    //         count: 22,
    //     },
    //     {
    //         day: '19/08/2024',
    //         count: 98,
    //     },
    //     {
    //         day: '20/09/2024',
    //         count: 88,
    //     },
    // ];
    const [loading, setLoading] = useState(false);  //true
    const transform = (data) => {
        return data.map(item => ({
            ...item,
            day: item.day.split('T')[0]
        }));
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [response1, response2 ] = await Promise.all([
                    getAttendancesInWeek(),
                    getAllEventsForEnterPrise()
                ]);

                setTotalAttendancesInWeek(transform(response1.data.data))
                setTotalEvents(response2.data.data.length)
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
                        <ItemLists type="events" count={"Loading..."} />
                        <ItemLists type="number of plays" count={"Loading..."} />
                    </div>
                ) : (
                    <div className="home_items">
                        <ItemLists type="events" count={totalEvents} />
                        <ItemLists type="number of plays" count={12} />
                    </div>
                )}

                <div className="chart_sec">
                    <div className="progress">
                        <ProgressBar />
                    </div>
                    <div className="charts">
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Chart marginBottom={150} data={totalAttendancesInWeek} height={450} title=" Total Rounds Played" />
                            </>
                        )}
                        {/* <Chart marginBottom={150} data={usersInWeekData} height={450} title="Total used vouchers" /> */}

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
