/* eslint-disable no-underscore-dangle */
import React from 'react';
import './TransactionList.scss';

// mui table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



function TableList({ data }) {
    // Replace this data with your own
    console.log(data)

    return (
        <TableContainer component={Paper} className="table_list">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table_cell">Tracking Id</TableCell>
                        <TableCell className="table_cell">Game</TableCell>
                        <TableCell className="table_cell">End User</TableCell>
                        <TableCell className="table_cell">Score</TableCell>
                        <TableCell className="table_cell">Date</TableCell>
                        {/* <TableCell className="table_cell">Enterprise</TableCell> */}
                        {/* <TableCell className="table_cell">Status</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row" className="table_cell">
                                <div className="game_idd">
                                    <img src={row.image} alt="game" className="game_img" />
                                    {row._id}
                                </div>
                            </TableCell>
                            <TableCell className="table_cell">{row.game}</TableCell>
                            <TableCell className="table_cell">{row.customer}</TableCell>
                            <TableCell className="table_cell">{row.score}</TableCell>
                            <TableCell className="table_cell">{row.date}</TableCell>
                            {/* <TableCell className="table_cell">{row.enterprise}</TableCell> */}
                            {/* <TableCell className="table_cell">
                                <span className={`status ${row.status}`}>{row.status}</span>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableList;
