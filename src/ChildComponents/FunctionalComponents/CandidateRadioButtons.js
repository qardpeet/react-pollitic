import React from 'react';

const CandidateRadioButtons = ({ candidates, handleChange }) => {
    const CandidateList = candidates.map(candidate => {
        return (
            <p className="pollitic-radio-btn" key={candidate.id}>
                <label>
                    <input
                        onClick={handleChange}
                        value={candidate.id}
                        className="with-gap"
                        name="candidateId"
                        type="radio"
                    />
                    <span>{candidate.name}</span>
                </label>
            </p>
        );
    });

    return CandidateList;
};

export default CandidateRadioButtons;
