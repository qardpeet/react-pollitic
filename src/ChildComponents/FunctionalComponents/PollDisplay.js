import React from 'react';
import { Link } from 'react-router-dom';

const PollFull = ({polls, size}) => {
    const gridClassNames = size === 'large' ? 'col s12 m12 l12 xl12' : 'col s12 m6 l6 xl3';
    const fontClassNames = size === 'large' ? 'pollitic-min-item-overlay full' : 'pollitic-min-item-overlay';

    const getTimeLeft = (closingDate) => {
        console.log(closingDate);
        const closingDateUnix = Date.parse(closingDate + ' UTC');
        const timeNow = new Date();
        const timeLeftUnix = closingDateUnix - timeNow;
        const timeLeft = new Date(timeLeftUnix);
        console.log(timeLeftUnix);

        const timeLeftDays = Math.round(timeLeft / (60 * 60 * 24 * 1000));
        const timeLeftHours = Math.round(timeLeft / (60 * 60 * 1000));
        const timeLeftMinutes = Math.round(timeLeft / (60 * 1000));

        if(timeLeftUnix < 0) return 'ხმის მიცემა დასრულებულია';
        if(timeLeftDays > 0) return 'დარჩენილია ' + timeLeftDays.toString() + ' დღე';
        if(timeLeftHours > 0) return 'დარჩენილია ' + timeLeftHours.toString() + ' საათი';
        return 'დარჩენილია ' + timeLeftMinutes.toString() + ' წუთი';
    }

    const pollList = polls.map(poll => {
        const imageLink = poll.imageLink ? {backgroundImage: `url(${poll.imageLink})`} : null;

        return(
            <div className={gridClassNames} key={poll.id} style={{padding: '1.5rem'}}>
                <div className="pollitic-min-item hoverable" style={imageLink}>
                    <Link to={'/poll/' + poll.id} className={fontClassNames}>
                        <div>                            
                            <h2>{poll.name}</h2>
                            <h4>{poll.totalVotes} ხმა</h4>
                            <h6>{getTimeLeft(poll.closingDate)}</h6>
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