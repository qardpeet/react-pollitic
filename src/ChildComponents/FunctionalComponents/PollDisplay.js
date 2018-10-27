import React from 'react';
import { Link } from 'react-router-dom';

const PollFull = ({polls, size}) => {
    const gridClassNames = size === 'large' ? 'col s12 m12 l12 xl12' : 'col s12 m6 l6 xl3';
    const fontClassNames = size === 'large' ? 'pollitic-min-item-overlay full' : 'pollitic-min-item-overlay';

    const pollList = polls.map(poll => {
        return(
            <div className={gridClassNames} key={poll.id} style={{padding: '1.5rem'}}>
                <div className="pollitic-min-item hoverable" style={{backgroundImage: `url(${poll.imageLink})`}}>
                    <Link to={'/poll/' + poll.id} className={fontClassNames}>
                        <div>
                            <h2>{poll.name}</h2>
                            <h4>{poll.totalVotes} ხმა</h4>
                        </div>
                    </Link>
                </div>
            </div>
        );
    });

    return(
        <React.Fragment>
            {pollList}
        </React.Fragment>
    );
}

export default PollFull;