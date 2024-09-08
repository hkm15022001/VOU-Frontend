import GradeIcon from '@mui/icons-material/Grade';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Tooltip } from '@mui/material';
import 'react-circular-progressbar/dist/styles.css';
import { Pie, PieChart, ResponsiveContainer, Text } from 'recharts';
import { getEventPercent } from '../../api';
// import css filr
import './progressBar.scss';

function ProgressBar() {
    const data01 = [
        { event_id: 'Event Summer 2', percent: 43 },
        { event_id: 'mua he', percent: 57 },
    ];
    const [eventPercent, setEventPercent] = useState([]);
    useEffect(() => {
        getEventPercent()
          .then(response => {
            if (response.data.data === null) {
                setEventPercent(data01)
            }
            setEventPercent(response.data.data);
          })
          .catch(error => {
            setEventPercent(data01)
            console.error('error when call API:', error);
          });
      }, []);
    const renderCustomLabel = ({ event_id, percent, x, y }) => {
        return (
            <Text
                x={x}
                y={y}
                fill="#000" // Màu sắc của chữ
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: 12 }} // Kích thước chữ
            >
                {`${event_id} (${percent} %)`}
            </Text>
        );
    };

    return (
        <div className="progress_bar">
            <div className="top">
                <p>Event Participation Rate</p>
                <MoreVertOutlinedIcon />
            </div>

            <div className="middle">
                <div className="progress">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="percent"
                                isAnimationActive={false}
                                data={eventPercent}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#536def"
                                label={renderCustomLabel}
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <p>Total Rounds Played Today.</p>
                <p className="price">
                    <GradeIcon style={{ fontSize: '32px' }} />
                    10
                </p>
            </div>
        </div>
    );
}

export default ProgressBar;
