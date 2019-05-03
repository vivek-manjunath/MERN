import React from  'react';

const Match = props => (
    <div>
        <h3>{props.homeTeam}</h3>
        <h5> vs </h5>
        <h3>{props.awayTeam}</h3>
    </div>
)

export default Match;