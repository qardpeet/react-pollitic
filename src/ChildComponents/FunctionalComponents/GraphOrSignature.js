import React from 'react';
import BarChart from './BarChart';

const GraphOrSignature = ({ totalVotes, candidates }) => {
    if (totalVotes < 1) return null;
    if (candidates.length < 2) {
        return (
            <>
                <hr />
                <h3 className="pollitic-petition">ამ პეტიციას {totalVotes} ადამიანი უჭერს მხარს</h3>
            </>
        );
    }
    return (
        <>
            <hr />
            <BarChart data={candidates} />
        </>
    );
};

export default GraphOrSignature;
