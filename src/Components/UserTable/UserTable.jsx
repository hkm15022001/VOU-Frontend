import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../../api';
import './UserTable.scss';

const UserDataGrid = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then(response => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('error when call API:', error);
        setLoading(false);
      });
  }, []);
  
  // useEffect(() => {
  //   getAllUsers()
  //     .then(response => {
  //       setUsers(response.data.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('error when call API:', error);
  //       setLoading(false);
  //     });
  // }, [users]);

  const handleDlt = (id) => {
    if (!window.confirm('Do you want delete this user ?')) {
      return;
    }

    deleteUser(id)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('error when delete user:', error);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'status', headerName: 'Status', width: 130,
        renderCell: (param) => (
            <div className={`status ${param.row.status}`}>{param.row.status}</div>
        ),
    },
    { field: 'role', headerName: 'Roles', width: 200 },
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
      <h2>User Lists</h2>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        loading={loading}
      />
    </div>
  );
};

export default UserDataGrid;
