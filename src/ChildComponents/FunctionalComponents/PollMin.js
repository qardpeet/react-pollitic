import React from 'react';
import { Link } from 'react-router-dom';

const PollMin = ({polls}) => {
    const pollList = polls.map(poll => {
        return(
            <div className="col s12 m6 l6 xl3" key={poll.id} style={{padding: '1.5rem 1.5rem'}}>
                <div className="pollitic-min-item hoverable" style={{backgroundImage: `url(${poll.imageLink})`}}>
                    <Link to={'/poll/' + poll.id} className="pollitic-min-item-overlay">
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

export default PollMin;