import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteGame, getAllGames } from '../../api';
import './GameTable.scss';

const GameDataGrid = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllGames()
      .then(response => {
        setGames(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('error when call API:', error);
        setLoading(false);
      });
  }, []);
  


  const handleDlt = (id) => {
    if (!window.confirm('Do you want delete this game ?')) {
      return;
    }

    deleteGame(id)
      .then(() => {
        setGames((prevGames) => prevGames.filter(game => game.id !== id));
      })
      .catch(error => {
        console.error('error when delete user:', error);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'tutorial', headerName: 'Tutorial', width: 250 },
    { field: 'exchange_allow', headerName: 'ExchangeAllow', width: 200,
        renderCell: (param) => (
            <div className={`status ${param.row.exchange_allow}`}>{param.row.exchange_allow.toString()}</div>
        ),
    },
    {
        field: 'action',
        headerName: 'Action',
        width: 170,
        renderCell: (params) => (
            <div className="actionn">
                <Link to={params.row.id}>
                    <button type="button" className="view_btn">
                        View
                    </button>
                </Link>
                <button
                    type="button"
                    className="delete_btn"
                    onClick={() => handleDlt(params.row.id)}
                >
                    Delete
                </button>
            </div>
        ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Game Lists</h2>
      <DataGrid
        rows={games}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        loading={loading}
      />
    </div>
  );
};

export default GameDataGrid;
