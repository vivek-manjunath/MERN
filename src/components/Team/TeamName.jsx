/** @format */

import React from 'react';
import {Link} from 'react-router-dom';

export default function TeamName(props) {
  return (
    <div>
      <Link to={props.teamProfileUrl}>
        <strong>{props.teamName}</strong>
      </Link>
    </div>
  );
}
