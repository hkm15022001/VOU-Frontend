import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { BackEndAddress, getAllEnterprises } from '../../api';
import './enterprise.scss';
import image from '/Images/book1.jpg'
const EnterpriseDataGrid = () => {
  const [enterprises, setEnterprises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEnterprises()
      .then(response => {
        setEnterprises(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('error when call API:', error);
        setLoading(false);
      });
  }, []);



  const columns = [
    {
      field: 'images', headerName: 'Image', width: 100,
      renderCell: (param) => (
        <img src={image} alt="enterprise" className="enterprise enterprise_image" />
      ),
    },
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'field', headerName: 'Field', width: 300 },
    { field: 'location', headerName: 'Location', width: 300 },
    {
      field: 'status', headerName: 'Status', width: 100,
      renderCell: (param) => (
        <div className={`status ${param.row.status}`}>{param.row.status}</div>
      ),
    },
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
      <h2>Enterprise Lists</h2>
      <DataGrid
        rows={enterprises}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        loading={loading}
      />
    </div>
  );
};

export default EnterpriseDataGrid;
