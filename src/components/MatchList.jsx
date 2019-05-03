import React from 'react';
import Match from './Match';

const MatchList = (props) => {
    const matchNodes = props.data.map(match => (
        <Match homeTeam={match.homeTeam} awayTeam={match.awayTeam}></Match>
    ))

    return (
        <div>
            {matchNodes}
        </div>
    )
}

export default MatchList;