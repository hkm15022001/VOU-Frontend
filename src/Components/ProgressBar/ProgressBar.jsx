import GradeIcon from '@mui/icons-material/Grade';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Tooltip } from '@mui/material';
import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { Pie, PieChart, ResponsiveContainer, Text } from 'recharts';

// import css filr
import './progressBar.scss';

function ProgressBar() {
    const data01 = [
        { name: 'Game Lắc Trúng Thưởng', value: 40 },
        { name: 'Game Trả Lời Câu Hỏi', value: 60 },
    ];
    const renderCustomLabel = ({ name, percent, x, y }) => {
        return (
            <Text
                x={x}
                y={y}
                fill="#000" // Màu sắc của chữ
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: 12 }} // Kích thước chữ
            >
                {`${name} (${(percent * 100).toFixed(0)}%)`}
            </Text>
        );
    };
    
    return (
        <div className="progress_bar">
            <div className="top">
                <p>Total number of rounds played in month</p>
                <MoreVertOutlinedIcon />
            </div>

            <div className="middle">
                <div className="progress">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data01}
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
                <p>Total number of rounds played today.</p>
                <p className="price">
                    <GradeIcon style={{ fontSize: '32px' }} />
                    52
                </p>
            </div>

            <div className="bottom">
                <p>Previous transection processing. Last payments may not be included.</p>

                <div className="botom_nested">
                    <div className="nested_nested">
                        <p>Last Week</p>
                        <p className="pricee">
                            <KeyboardArrowUpOutlinedIcon /> 347
                        </p>
                    </div>
                    <div className="nested_nested">
                        <p>Last Month</p>
                        <p className="pricee decrese">
                            <KeyboardArrowUpOutlinedIcon /> 1354
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;
