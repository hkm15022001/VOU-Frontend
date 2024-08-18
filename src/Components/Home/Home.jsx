import { React, useEffect, useState } from 'react';
import { getCountAllEnterprises, getCountAllGames, getCountAllUsers } from '../../api';
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
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [response1, response2, response3] = await Promise.all([
                    getCountAllUsers(),
                    getCountAllGames(),
                    getCountAllEnterprises()
                ]);
                setCountUsers(response1.data.data);
                setCountGames(response2.data.data);
                setCountEnterprises(response3.data.data);
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
                    <ItemLists type="events" count={22}/>
                    <ItemLists type="enterprise" count={countEnterprises}/>
                </div>)
                }
                

                <div className="chart_sec">
                    <ProgressBar />
                    <Chart height={450} title="Total players" />
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
