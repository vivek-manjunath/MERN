/** @format */

import React from 'react';
import {Link} from 'react-router-dom';

export default function PlayerLink({playerName, playerProfileUrl}) {
  return (
    <div>
      <Link className="tcl-link" to={playerProfileUrl}>
        <span className="text-primary font-weight-bold">{playerName}</span>
      </Link>
    </div>
  );
}
