/* eslint-disable no-underscore-dangle */
import React from 'react';
import './tableList.scss';

// mui table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// import dummy image
import book1 from '../../Images/book1.jpg';
import book2 from '../../Images/book2.jpg';
import book3 from '../../Images/book3.jpg';
import book4 from '../../Images/book4.jpg';
import book5 from '../../Images/book5.jpg';

function TableList() {
    // Replace this data with your own
    const data = [
        {
            _id: 23423343,
            game: 'Game Lắc Trúng Thưởng',
            image: book1,
            customer: 'Devid John',
            date: '3 October, 2024',
            score: 45,
            enterprise: 'Shopee',
            status: 'Approved',
        },
        {
            _id: 235343343,
            game: 'Game Lắc Trúng Thưởng',
            image: book2,
            customer: 'Julia Ani',
            date: '23 April, 2024',
            score: 55,
            enterprise: 'Grab',
            status: 'Pending',
        },
        {
            _id: 234239873,
            game: 'Game trả lời câu hỏi Trúng Thưởng',
            image: book3,
            customer: 'John Smith',
            date: '10 October, 2024',
            score: 25,
            enterprise: 'Bee',
            status: 'Approved',
        },
        {
            _id: 23423143,
            game: 'Game Lắc Trúng Thưởng',
            image: book4,
            customer: 'Devid John',
            date: '3 March, 2024',
            score: 40,
            enterprise: 'Garena',
            status: 'Approved',
        },
        {
            _id: 123423343,
            game: 'Game trả lời câu hỏi Trúng Thưởng',
            image: book5,
            customer: 'Humlar',
            date: '20 November, 2024',
            score: 45,
            enterprise: 'Viettel Money',
            status: 'Approved',
        },
        {
            _id: 2333343,
            game: 'Game trả lời câu hỏi Trúng Thưởng',
            image: book2,
            customer: 'Devid John',
            date: '12 June, 2024',
            score: 28,
            enterprise: 'FPT Play',
            status: 'Pending',
        },
    ];

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
                        <TableCell className="table_cell">Enterprise</TableCell>
                        <TableCell className="table_cell">Status</TableCell>
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
                            <TableCell className="table_cell">{row.enterprise}</TableCell>
                            <TableCell className="table_cell">
                                <span className={`status ${row.status}`}>{row.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableList;
