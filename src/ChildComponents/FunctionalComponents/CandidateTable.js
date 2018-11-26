import React from 'react';

const CandidateTable = ({ candidateList }) => {
    const candidateTable = candidateList.map(candidate => {
        return (
            <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.voteCount}</td>
                <td>{candidate.percentage}%</td>
            </tr>
        );
    });

    return candidateTable;
};

export default CandidateTable;
