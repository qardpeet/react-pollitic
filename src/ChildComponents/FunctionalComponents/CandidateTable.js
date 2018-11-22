import React from 'react';

const CandidateTable = ({ voteNumberList, candidateList, votePercentList }) => {
    const candidateTable = candidateList.map((candidate, index) => {
        return (
            <tr key={index}>
                <td>{candidate}</td>
                <td>{voteNumberList[index]}</td>
                <td>{votePercentList[index]}</td>
            </tr>
        );
    });

    return candidateTable;
};

export default CandidateTable;
