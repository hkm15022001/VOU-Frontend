import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { BackEndAddress, deleteEvent, getAllEvents } from '../../api';
import './events.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EventDataGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getAllEvents()
      .then(response => {
        // console.log(response.data.data)
        if (response.data.data === null) {
          setLoading(false);
          return
        }
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('error when call API:', error);
        setLoading(false);
        navigate(-1);
      });
  }, []);


  const columns = [
    {
      field: 'images', headerName: 'Image', width: 100,
      renderCell: (param) => (
        <img src={`${BackEndAddress}/image/event/${param.row.images}`} alt="event" className="event event_image" />
      ),
    },
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'voucher_num', headerName: 'Number of Voucher', width: 150 },
    { field: 'game_name', headerName: 'Game', width: 300 },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <div className="actionn">
          <Link to={params.row.id}>
            <button type="button" className="view_btn">
              View
            </button>
          </Link>
          {/* <button
                    type="button"
                    className="delete_btn"
                    onClick={() => handleDlt(params.row.id)}
                >
                    Delete
                </button> */}
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Event Lists</h2>
      <DataGrid
        rows={events}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        loading={loading}
      />
    </div>
  );
};

export default EventDataGrid;
