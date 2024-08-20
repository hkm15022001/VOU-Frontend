import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { BackEndAddress, deleteEvent, getAllEvents } from '../../api';
import './events.scss';

const EventDataGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEvents()
      .then(response => {
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('error when call API:', error);
        setLoading(false);
      });
  }, []);
  


  const handleDlt = (id) => {
    if (!window.confirm('Do you want delete this event ?')) {
      return;
    }

    deleteEvent(id)
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
      })
      .catch(error => {
        console.error('error when delete user:', error);
      });
  };

  const columns = [
    { field: 'images', headerName: 'Image', width: 100,
      renderCell: (param) => (
          <img src={`${BackEndAddress}/image/event/${param.row.images}`} alt="event" className="event event_image" />
      ),
  },
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'voucher_num', headerName: 'Number of Voucher', width: 300 },
    { field: 'game_name', headerName: 'Game', width: 300 },
    {
        field: 'action',
        headerName: 'Action',
        width: 100,
        renderCell: (params) => (
            <div className="actionn">
                {/* <Link to={params.row.id}> */}
                    <button type="button" className="view_btn">
                        View
                    </button>
                {/* </Link> */}
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
