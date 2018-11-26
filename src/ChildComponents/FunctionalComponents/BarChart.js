import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import CandidateTable from './CandidateTable';

const BarChart = ({ data, totalVotes }) => {
    const candidates = data.map(candidate => {
        return {
            ...candidate,
            percentage: (candidate.voteCount / totalVotes) * 100,
        };
    });

    const quickSortCandidates = arr => {
        if (arr.length < 2) return arr;

        const pivot = arr[Math.floor(Math.random() * arr.length)];

        let left = [];
        let equal = [];
        let right = [];

        for (let element of arr) {
            if (element.percentage % 1 < pivot.percentage % 1) right.push(element);
            else if (element.percentage % 1 > pivot.percentage % 1) left.push(element);
            else equal.push(element);
        }

        return quickSortCandidates(left)
            .concat(equal)
            .concat(quickSortCandidates(right));
    };

    const floorCandidatePercentage = arr => {
        let finalArr = [];
        for (let i in arr) {
            finalArr.push({ ...arr[i], percentage: parseInt(arr[i].percentage) });
        }
        return finalArr;
    };

    const getSum = (total, num) => {
        return total + num;
    };

    const scaleSortedCandidatePercentage = (arr, defaultSum) => {
        let percentagesList = arr.map(candidate => {
            return candidate.percentage;
        });

        let arrSum = percentagesList.reduce(getSum);
        let finalArr = [];

        if (arrSum < defaultSum) {
            for (let i in arr) {
                if (arrSum < 100) {
                    finalArr.push({ ...arr[i], percentage: arr[i].percentage + 1 });
                    arrSum += 1;
                } else {
                    finalArr.push(arr[i]);
                }
            }
        } else {
            finalArr = arr;
        }

        return finalArr;
    };

    const candidateList = scaleSortedCandidatePercentage(
        floorCandidatePercentage(quickSortCandidates(candidates)),
        100
    );

    const candidateNameList = candidateList.map(candidate => {
        return candidate.name;
    });

    const voteNumberList = candidateList.map(candidate => {
        return candidate.voteCount;
    });

    const votePercentList = candidateList.map(candidate => {
        return candidate.percentage;
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
            <h3>ცხრილი</h3>
            <div className="row">
                <div className="col s12 pollitic-table">
                    <table>
                        <thead>
                            <tr>
                                <th>პასუხი</th>
                                <th>ხმების რაოდენობა</th>
                                <th>პროცენტულობა</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CandidateTable candidateList={candidateList} />
                        </tbody>
                    </table>
                </div>
            </div>
            <h3>დონატი</h3>
            <div className="horizontal-bar-chart pollitic-item padded-white">
                <div>
                    <Doughnut
                        data={() => buildData(candidateNameList, votePercentList)}
                        options={{
                            responsive: true,
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
                        data={() => buildData(candidateNameList, voteNumberList)}
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
