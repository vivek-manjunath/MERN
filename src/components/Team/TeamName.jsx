/** @format */

import React from 'react';
import {Link} from 'react-router-dom';

export default function TeamName(props) {
  return (
    <div>
      <span className="team-name">{props.teamName}</span>
    </div>
  );
}
