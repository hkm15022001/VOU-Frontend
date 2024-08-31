import React from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from 'recharts';
// import css file
import './chart.scss';

/* The `data` array is used to store the data points for the chart. Each object in the array represents
a data point and has two properties: `name` and `total`. */
// Place your own data here
// const data = [
//     {
//         name: '03/08/2024',
//         total: 50,
//     },
//     {
//         name: '04/08/2024',
//         total: 75,
//     },
//     {
//         name: '05/08/2024',
//         total: 80,
//     },
//     {
//         name: '06/08/2024',
//         total: 45,
//     },
//     {
//         name: '07/08/2024',
//         total: 66,
//     },
//     {
//         name: '08/08/2024',
//         total: 105,
//     },
//     {
//         name: '08/09/2024',
//         total: 88,
//     },
// ];

function Chart({ data, height, title ,marginBottom}) {
    const bottomSpace = marginBottom || 0;

    return (
        <div className="chart_sec">
            <div>
                <div className="title">
                    <p>{title} (Last week)</p>
                </div>

                <div style={{ width: '100%', height: 300 }}>
                    {/* <ResponsiveContainer> */}
                    <AreaChart
                        width={850}
                        height={height}
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: bottomSpace }}
                    >
                        <defs>
                            <linearGradient id="totals" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#536def" stopOpacity={0.9} />
                                <stop offset="95%" stopColor="#536def" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="gray" />
                        <CartesianGrid strokeDasharray="3 3" className="strokee" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#536def"
                            fillOpacity={1}
                            fill="url(#totals)"
                        />
                    </AreaChart>
                    {/* </ResponsiveContainer> */}
                </div>
            </div>
        </div>
    );
}

export default Chart;
