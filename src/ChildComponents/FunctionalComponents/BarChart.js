import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

const BarChart = ({ data, totalVotes }) => {
    const candidateList = data.map(candidate => {
        return candidate.name;
    });

    const voteNumberList = data.map(candidate => {
        return candidate.voteCount;
    });

    const votePercentList = data.map(candidate => {
        return Math.round((candidate.voteCount / totalVotes) * 100);
    });

    const buildData = (candidateArr, voteArr) => {
        const dataMount = {
            labels: candidateArr,
            datasets: [
                {
                    label: 'ხმების რაოდენობა',
                    data: voteArr,
                    backgroundColor: [
                        'rgba(143, 0, 185, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(115,99,169, 0.5)',
                        'rgba(16,22,104, 0.5)',
                        'rgba(185,198,1, 0.5)',
                        'rgba(201,76,94, 0.5)',
                        'rgba(146,1,255, 0.5)',
                        'rgba(63,229,86, 0.5)',
                        'rgba(189,20,94, 0.5)',
                        'rgba(254,161,206, 0.5)',
                        'rgba(149,208,36, 0.5)',
                        'rgba(232,110,10, 0.5)',
                        'rgba(25,52,132, 0.5)',
                        'rgba(102,82,133, 0.5)',
                        'rgba(112,190,78, 0.5)',
                        'rgba(139,60,230, 0.5)',
                        'rgba(65,2,241, 0.5)',
                    ],
                },
            ],
        };

        return dataMount;
    };

    return (
        <>
            <h3>დონატი</h3>
            <div className="horizontal-bar-chart pollitic-item padded-white">
                <div>
                    <Doughnut
                        data={() => buildData(candidateList, votePercentList)}
                        height={500}
                        options={{
                            maintainAspectRatio: false,
                            legend: {
                                display: true,
                                position: 'bottom',
                            },
                            tooltips: {
                                callbacks: {
                                    label: (tooltipItem, data) => {
                                        const label = data.labels[tooltipItem.index] + ': ';
                                        const value =
                                            data.datasets[tooltipItem.datasetIndex].data[
                                                tooltipItem.index
                                            ];
                                        return label + value + '%';
                                    },
                                },
                                bodyFontSize: 14,
                                bodyFontFamily: 'BPGarial',
                            },
                        }}
                    />
                </div>
            </div>
            <hr />
            <h3>გრაფა</h3>
            <div className="horizontal-bar-chart pollitic-item padded-white">
                <div>
                    <Bar
                        data={() => buildData(candidateList, voteNumberList)}
                        height={500}
                        options={{
                            maintainAspectRatio: false,
                            legend: {
                                display: true,
                                position: 'bottom',
                            },
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                            tooltips: {
                                bodyFontSize: 14,
                                bodyFontFamily: 'BPGarial',
                            },
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default BarChart;
