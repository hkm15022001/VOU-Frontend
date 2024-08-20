import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../Components/Button/Button';
import Chart from '../../Components/Chart/Chart';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import TableList from '../../Components/TransactionList/TransactionList';
import { BackEndAddress, getGame, updateGame } from '../../api';
import GameDetailsEdit from '../GameEdit/GameEdit';
import './GameDetail.scss';
const data = [
    {
        day: '03/08/2024',
        count: 50,
    },
    {
        day: '04/08/2024',
        count: 75,
    },
    {
        day: '05/08/2024',
        count: 80,
    },
    {
        day: '06/08/2024',
        count: 45,
    },
    {
        day: '07/08/2024',
        count: 66,
    },
    {
        day: '08/08/2024',
        count: 105,
    },
    {
        day: '08/09/2024',
        count: 88,
    },
];
function GameDetail() {
    // const { userId, productId } = useParams();
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const gameData = await getGame(gameId);
                setGame(gameData.data.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchGame();
    }, [gameId]);

    const handleSave = async (updatedGame) => {
        try {
            // console.log(updatedgame)
            await updateGame(gameId, updatedGame);
            setGame(updatedGame);
            setEditing(false);
            navigate('/games'); // Điều hướng về trang danh sách người dùng
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

    if (loading) return  (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
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

                <div className="game_info">
                    {editing ? (
                        <GameDetailsEdit  onSave={handleSave} onCancel={handleCancel} game={{
                            name: game.name,
                            images: game.images,
                            tutorial: game.tutorial,
                            type: game.type,
                            exchange_allow: game.exchange_allow
                          }}/>
                    ) :
                    (<div className="game_detail">
                        <img src={`${BackEndAddress}/image/game/${game.images}`} alt="game" className="game_image" />
                        <div className="game_detailss">
                            <p className="name">{game.name}</p>
                            <p>Type: {game.type}</p>
                            <p>ExchangeAllow: {game.exchange_allow.toString()}</p>
                            <p>Tutorial: {game.tutorial}</p>
                        </div>
                        <CustomButton type={"button"} content={"Edit"} onClickHandle={handleEdit}></CustomButton>
                    </div>
                    )}

                    <div className="game_chart">
                        <Chart data={data} height={390} title="Number of plays" />
                    </div>
                </div>

                <div className="table">
                    <div className="title">Events List</div>
                    <TableList />
                </div>
            </div>
            
        </div>
    );
}

export default GameDetail;
