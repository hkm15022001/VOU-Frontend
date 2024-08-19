import { React, useEffect, useState } from 'react';
import { getCountAllEnterprises, getCountAllGames, getCountAllUsers, getStatisticEnterprises, getStatisticUsers } from '../../api';
import Chart from '../Chart/Chart';
import ItemLists from '../ItemLists/ItemLists';
import Navbar from '../Navbar/Navbar';
import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../Sidebar/Sidebar';
import TableList from '../TransactionList/TransactionList';
import './Home.scss';

function Home() {
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
                {loading ?  
                    (<div className="home_items">
                    <ItemLists type="user" count={"Loading..."}/>
                    <ItemLists type="games" count={"Loading..."}/>
                    <ItemLists type="events" count={"Loading..."}/>
                    <ItemLists type="enterprise" count={"Loading..."}/>
                    </div>) : 
                    (<div className="home_items">
                    <ItemLists type="user" count={countUsers}/>
                    <ItemLists type="games" count={countGames}/>
                    <ItemLists type="events" count={4}/>
                    <ItemLists type="enterprise" count={countEnterprises}/>
                </div>)
                }
                

                <div className="chart_sec">
                    <div className="progress">
                        <ProgressBar />
                    </div>
                    <div className="charts">
                        <Chart  marginBottom={150} data={usersInWeekData} height={450} title="Total registered users" />
                        <Chart marginBottom={20} data={enterpriseInWeekData} height={450} title="Total registered enterprise" />
                    </div>
                </div>

                <div className="table">
                    <div className="title">Latest Transactions</div>
                    <TableList />
                </div>
            </div>
        </div>
    );
}

export default Home;
