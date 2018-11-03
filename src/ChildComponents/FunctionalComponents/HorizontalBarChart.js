import React from 'react';
import { Bar } from 'react-chartjs-2';

const HorizontalBarChart = ({ data }) => {
    const candidateList = data.map(candidate => {
        return candidate.name;
    });

    const voteNumberList = data.map(candidate => {
        return candidate.voteCount;
    });

    const dataMount = {
        labels: candidateList,
        datasets: [
            {
                label: 'ხმების რაოდენობა',
                data: voteNumberList,
                backgroundColor: ['rgba(143, 0, 185, 0.5)'],
            },
        ],
    };

    return (
        <div className="horizontal-bar-chart pollitic-item padded-white">
            <div>
                <Bar
                    data={dataMount}
                    options={{
                        maintainAspectRatio: false,
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default HorizontalBarChart;
